const AccountServices = require('../../services/account-services');
const MessageServices = require('../../services/message-services');
const ChatServices = require('../../services/chat-services');
const ApiError = require('../../exceptions/api-error');

module.exports = (io, socket) => {

	const list = async (callback) => {

		try {

			console.log(callback);

			const account = socket.account;

			const user = await AccountServices.getUserByAccount( account );

			const chats = await ChatServices.findChatsByUserId(user.id);

			socket.emit( 'chats:sendToClient', {
				data: {
					chats
				}
			} );
			
		} catch ( error ) {

			console.log(error);
			
		}

	};

	const create = async () => {

		try {

			const account = socket.account;

			const user = await AccountServices.getUserByAccount( account );

			const { chat, message } = io;

			console.log(chat, message);

			if ( !chat  ) {

				throw ApiError.BadRequest('There is not enough information about the new chat');

			}

			if ( !chat.members.includes( user.id ) ) {

				throw ApiError.BadRequest('The message does not contain information of the authorized user');

			}
			
			if ( !message ) {

				throw ApiError.BadRequest('Uncorrect create a chat without message');

			}

			const chatData = await ChatServices.create({ chat, message, userId: user.id });

			res.json({
				message: 'Chat created successfully',
				data: {
					chats: [
						{
							...chatData
						}
					]
				}
			});

		} catch (error) {
			
			console.log(error);

		}

	};

	socket.on( 'chats:list', list );
	socket.on( 'chats:create', create );

}