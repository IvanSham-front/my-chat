const AccountServices = require('../../services/account-services');
const MessageServices = require('../../services/message-services');
const ChatServices = require('../../services/chat-services');

module.exports = (io, socket) => {

	send = async (data, callback) => {

		if (typeof callback !== "function") {

			return;
			
		}

		try {

			const account = socket.account;

			const { chatId, message } = data;

			const user = await AccountServices.getUserByAccount(account);
			
			await MessageServices.send({
				message: {
					...message,
					chatId
				},
				sellerId: user.id,
			})

			await ChatServices.notifyChatMembers( io, { 
				chatId, 
				data: {
					message,
				},
				emitName: 'server:message:send'
			});

			callback({
				status: 'ok',
				data: {
					message
				}
			})
			
		} catch (error) {

			next(error);
			
		}
	};


	getMessagesByChatId = async (data, callback) => {

		if ( typeof callback !== 'function' ) {

			return;

		}

		try {

			const { account } = socket;

			const user = await AccountServices.getUserByAccount(account);

			const { chatId } = data;

			const messages = await MessageServices.getMessagesByChatId( { chatId, userId: user.id} );

			callback({
				status: 'ok',
				data: { messages }
			});

		} catch(error) {

			next(error);

		}
	};

	socket.on( 'client:message:send', send );
	socket.on( 'client:messages:get-list', getMessagesByChatId )

};