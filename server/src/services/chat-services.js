const mongoose = require('mongoose');
const ApiError = require('../exceptions/api-error');

const Chat = mongoose.model('Chat', require('../models/Chat'));
const Message = mongoose.model('Message', require('../models/Message'));
const User = mongoose.model('User', require('../models/User'));
const MessageServices = require('./message-services');

class ChatServices {
	
	async findChatsByUserId(userId) {

		let chats = await Chat.find({
			members: { $in: [userId] },
		});

		const queue = [];

		async function getLastMessage( chat ) {

			const lastMessages = await Message.find({ chatId: chat.id })
				.sort({ createdAt: -1 })
				.limit(1);

			const result = chat.toObject();

			if (lastMessages.length > 0) {
				result.lastMessage = lastMessages[0];
			}

			return result;

		}

		chats.forEach(chat => {
			queue.push(getLastMessage(chat));
		})

		chats = await Promise.all(queue);

		return chats;
	}

	async create({ chat, message, userId }) {

		if ( chat.type === 'private' && chat.members.length !== 2 ) {

			throw ApiError.BadRequest( 'In a private chat, there should be only 2 users' );

		}

		chat = await Chat.create({ ...chat });

		if (!chat) {

			throw ApiError.BadRequest( 'Error creating chat' );

		}

		message.chatId = chat.id;

		message = await MessageServices.send( { message, sellerId: userId } );

		if (!message) {

			throw ApiError.BadRequest('Error sending message');

		}

		chat = chat.toObject();

		return {
			...chat,
			lastMessage: message,
		};
	}

	async remove(chatId) {

		const chat = await Chat.findByIdAndDelete( chatId );

		if ( !chat ) {

			throw ApiError.BadRequest( `Chat [ ${ chatId } ] not found.` )

		}

		await Message.deleteMany({ chatId });

		return {
			chats: chat,
		};
	};

	async notifyChatMembers(io, { chat, emitName, userId }) {

		const chatUsers = await Promise.all(
			chat.members
				.filter(memberId => memberId.toString() !== userId.toString())
				.map(async (memberId) => {
					const user = await User.findById(memberId);
					return user;
				})
		);

		chatUsers.forEach( user => {


			user.socketIds && user.socketIds.forEach(socketId => {

				io.to( socketId ).emit( emitName , {
					status: 'ok',
					data: chat
				});
									
			});

		} );

	}
	
}

module.exports = new ChatServices();
