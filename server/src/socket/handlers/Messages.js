const AccountServices = require('../../services/account-services');
const MessageServices = require('../../services/message-services');
const ChatServices = require('../../services/chat-services');

module.exports = (io, socket) => {

	const getUsersChat = async () => {

		try {

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

	socket.on('chats:list', getUsersChat);

}