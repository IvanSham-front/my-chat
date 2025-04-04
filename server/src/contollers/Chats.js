const ApiError = require('../exceptions/api-error');
const AccountServices = require('../services/account-services');
const ChatServices = require('../services/chat-services');

module.exports = {

	getUsersChat: async ( req, res, next ) => {

		try {

			const account = req.account;

			const user = await AccountServices.getUserByAccount( account );

			const chats = await ChatServices.findChatsByUserId(user.id);

			res.json({
				data: {
					chats
				}
			});
			
		} catch ( error ) {

			next( error );
			
		}

	},

	create: async ( req, res, next ) => {

		try {

			const account = req.account;

			const user = await AccountServices.getUserByAccount( account );

			const { chat, message } = req.body;

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
					chats: chatData
				}
			});

		} catch (error) {
			
			next(error);

		}

	},

	remove: async ( req, res, next ) => {

		try {

			const { chatId } = req.params;

			const chatData = await ChatServices.remove(chatId);

			res.json({
				message: 'Chat deleted successfully',
				data: {
					сhat: chatData
				}
			})

		} catch (error) {
			
			next(error);

		}

	}	

}