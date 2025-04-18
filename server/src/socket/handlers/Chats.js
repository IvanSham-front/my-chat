const AccountServices = require('../../services/account-services');
const ChatServices = require('../../services/chat-services');
const ApiError = require('../../exceptions/api-error');

module.exports = (io, socket) => {

	const list = async ( data, callback ) => {

		if (typeof callback !== "function") {

			return;
			
		}

		try {

			const account = socket.account;

			const user = await AccountServices.getUserByAccount(account);

			const chats = await ChatServices.findChatsByUserId(user.id);

			callback({
				status: 'ok',
				data: { chats }
			});
			
		} catch ( error ) {

			callback({
				status: 'error'
			})

			console.error(error);
			
		}

	};

	const create = async ( data, callback ) => {

		if (typeof callback !== "function") {

			return;
			
		}

		try {

			const account = socket.account;

			const user = await AccountServices.getUserByAccount( account );

			const { chat, message } = data;

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

			await ChatServices.notifyChatMembers(io, {
				
				chatId: chat.id,
				data: { chat: chatData },
				emitName: 'server:chat:create'

			})
			
			callback({
				status: 'ok',
				data: { chat: chatData }
			});

		} catch (error) {

			callback({
				status: 'error'
			});
			
			console.log(error);

		}

	};

	socket.on( 'client:chats:list', list );
	socket.on( 'client:chats:create', create );

}