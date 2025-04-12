import { ChatDB, IChat } from '@/types/Chat';
import { SocketService } from './socket.io/socket.io';
import api from '.';
import { IMessage, MessageDB } from '@/types/Message';

// Здесь будем логировать ошибки на уровне сервера или выбора 
// Все методы АПИ возвращают только объект с ответом. Без data и тд 

class ApiChatManager {

	private retryCount = 0;
	private readonly maxRetries = 3;

	async getChatList(): Promise<ChatDB[]> {

		try {

			return await api.chats.getList();

		} catch(error) {

			throw error;

		}

	}

	async createChat( chat: IChat, message: IMessage ): Promise<ChatDB> {

		const socket = SocketService.getInstance();

		if (socket.isConnected()) {

			try {

				return await this.createChatViaSocket(socket, chat, message);

			} catch (error) {

				console.error('WebSocket failed, falling back to HTTP', error);

				return await this.createChatViaHttp(chat, message);
			}

		}

		return await this.createChatViaHttp(chat, message);
		
	}

	private createChatViaSocket(socket: SocketService, chat: IChat, message: IMessage): Promise<ChatDB> {

		return new Promise((resolve, reject) => {

			socket.emit('client:chats:create', { chat, message }, (response) => {

				if (response?.status === 'ok' && response.data) {
					
					if (!response.data.chat) {
						reject( new Error(`Invalid response format, ${ response.data }`) );
					}

					this.retryCount = 0;

					resolve(response.data.chat);

				} else {

					this.retryCount++;

					if (this.retryCount <= this.maxRetries) {

						console.log(`Retry attempt ${this.retryCount}`);
						resolve(this.createChatViaSocket(socket, chat, message));

					} else {

						this.retryCount = 0;
						reject(new Error('Max retry attempts reached'));

					}
				}
				
			});

		});

	}

	private async createChatViaHttp (chat: IChat, message: IMessage): Promise<ChatDB> {

		try {

			return await api.chats.create(chat, message);

		} catch(error) {

			throw error;

		}

	}

	async sendMessage ( chatId: string, message: IMessage ): Promise<MessageDB> {

		const socket = SocketService.getInstance();

		if (socket.isConnected()) {

			try {

				return await this.sendMessageViaSocket(socket, chatId, message);

			} catch (error) {

				console.error('WebSocket failed, falling back to HTTP', error);

				return await this.sendMessageViaHttp(chatId, message);
			}

		}

		return await this.sendMessageViaHttp(chatId, message);

	}

	private sendMessageViaSocket ( socket: SocketService, chatId: string, message: IMessage ): Promise<MessageDB> {

		return new Promise((resolve, reject) => {

			socket.emit('client:messages:send', { chatId, message }, (response) => {

				if (response?.status === 'ok' && response.data) {

					if (!response.data.message) {
						reject( new Error(`Invalid response format, ${ response.data }`) );
					};

					this.retryCount = 0;

					resolve(response.data.message);

				} else {

					this.retryCount++;

					if (this.retryCount <= this.maxRetries) {

						console.log(`Retry attempt ${this.retryCount}`);
						resolve(this.sendMessageViaSocket(socket, chatId, message));

					} else {

						this.retryCount = 0;
						reject(new Error('Max retry attempts reached'));

					}

					reject(new Error('Failed to send message via WebSocket'));

				}

			});


		});


	}

	private async sendMessageViaHttp (chatId: string, message: IMessage) {

		try {

			return await api.chats.sendMessage(chatId, message);

		} catch(error) {

			throw error;

		}

	}

	async getMessagesByChatId( chatId:string ): Promise<MessageDB[]> {

		try {
			return await api.chats.getMessages(chatId);

		} catch (error) {

			throw error;

		}

	}

	async removeMessage ( chatId: string, messageId: string ) {

		try {
			return await api.chats.removeMessage(chatId, messageId);

		} catch (error) {

			throw error;

		}

	}

}

export default new ApiChatManager();