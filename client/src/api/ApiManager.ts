import { ChatDB } from '@/types/Chat';
import { SocketService } from './socket.io/socket.io';
import api from '.';

class ApiManager {
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
				api.chats.getList().then((response) => {
					if (response) {
						resolve(response);
					}
				});
			} reject(new Error('Not connected'));
		});
	}

	
}

export default new ApiManager();
