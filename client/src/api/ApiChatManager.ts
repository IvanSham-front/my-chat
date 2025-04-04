import { ChatDB, IChat } from '@/types/Chat';
import { SocketService } from './socket.io/socket.io';
import api from '.';
import { IMessage, MessageDB } from '@/types/Message';

class ApiChatManager {

	getChatList(): Promise<ChatDB[]> {

		return new Promise((resolve, reject) => {
			const socket = SocketService.getInstance();
			
			if (socket.isConnected()) {
				socket.emit('client:chats:list', {}, (response) => {
					if (response.status === 'ok') {
						resolve(response?.data?.chats);
					}
				});
			} else {
				api.chats.getList().then((responseChats) => {
					if (responseChats) {
						resolve(responseChats);
					}
				});
			} 

			reject(new Error('Not connected'));
			
		});

	}

	createChat( chat: IChat, message: IMessage ): Promise<ChatDB> {

		return new Promise(( resolve, reject ) => {
			const socket = SocketService.getInstance();

			if (socket.isConnected()) {
				socket.emit( 'client:chats:create' , { chat, message }, (response) => {
					if (response.status === 'ok') {
						resolve(response?.data);
					}
				});
			} else {
				api.chats.create( chat, message ).then((responseChat) => {
					if (responseChat) {
						resolve(responseChat);
					}
				});
			} 

			reject(new Error ('Not connected'));
			
		});

	}

	sendMessage ( chatId: string, message: IMessage ): Promise<MessageDB> {

		return new Promise((resolve, reject) => {

			const socket = SocketService.getInstance();

			if (socket.isConnected()) {
				socket.emit( 'client:messages:send' , { chatId, message }, (response) => {
					if (response.status === 'ok') {
						resolve(response?.data.message);
					}
				});
			} else {
				api.chats.sendMessage( chatId, message ).then((responseMessage) => {
					if (responseMessage) {
						resolve(responseMessage);
					}
				});
			} 

			reject(new Error ('Not connected'));

		});

	}

	getMessagesByChatId( chatId:string ): Promise<MessageDB[]> {

		return new Promise((resolve, reject) => {

			api.chats.getMessages(chatId).then((responseMessage) => {
				if (responseMessage) {
					resolve(responseMessage);
				}
			});

			reject(new Error ('Not connected'));

		});

	}

	removeMessage ( chatId: string, messageId: string ) {

		return new Promise((resolve, reject) => {

			api.chats.removeMessage(chatId, messageId ).then((responseMessage) => {
				if (responseMessage) {
					resolve(responseMessage);
				}
			});

			reject(new Error ('Not connected'));

		});

	}

}

export default new ApiChatManager();
