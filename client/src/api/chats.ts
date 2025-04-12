import { ChatDB, IChat } from '@/types/Chat';
import $axios, { handleAxiosError } from './api';
import { IMessage, MessageDB } from '@/types/Message';

export const chatsApi = {

	getList: async () => {

		try {

			const { data } = await $axios.get<{ chats: ChatDB[] }>('/chats');
			
			if (!data?.chats) {
				throw new TypeError(`Invalid response format, ${ data }`);
			};

			return data.chats;

		} catch( error ) {

			handleAxiosError(error);
			throw error;
		}

	},

	create: async (chat: IChat, message: IMessage) => {

		try {

			const { data } = await $axios.post<{ chat: ChatDB }>('/chats', { chat, message });

			if (!data.chat) {
				throw new TypeError( `Invalid response format, ${ data }` );
			}

			return data?.chat;

		} catch (error) {

			handleAxiosError(error);
			throw error;

		}

	},

	remove: async (chatId: string) => {

		try {

			const { data } = await $axios.delete<{ chat: ChatDB }>(`/chats/${ chatId }`);

			if (!data.chat) {
				throw new TypeError( `Invalid response format, ${ data }` );
			}

			return data.chat;

		} catch (error) {

			handleAxiosError(error);
			throw error;

		}

	},

	getMessages: async (chatId: string) => {

		try {

			const { data } = await $axios.get<{ messages: MessageDB[] }>(`/chats/${chatId}/messages`);

			if (!data.messages) {
				throw new TypeError( `Invalid response format, ${ data }` );
			}

			return data?.messages;

		} catch (error) {

			handleAxiosError(error);
			throw error;

		}

	},

	sendMessage: async (chatId: string, message: IMessage) => {

		try {

			const { data } = await $axios.post<{ message: MessageDB }>(`/chats/${chatId}/messages`, message);

			if (!data.message) {
				throw new TypeError( `Invalid response format, ${ data }` );
			}

			return data.message;

		} catch (error) {

			handleAxiosError(error);
			throw error;

		}
	},

	removeMessage: async (chatId: string, messageId: string) => {

		try {

			const { data } = await $axios.delete<{ message: MessageDB }>(`/chats/${chatId}/messages/${messageId}`);

			if (!data.message) {
				throw new TypeError( `Invalid response format, ${ data }` );
			}

			return data.message;

		} catch (error) {

			handleAxiosError(error);
			throw error;

		}

	}
	
};