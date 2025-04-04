import { ChatDB, IChat } from '@/types/Chat';
import $axios, { handleAxiosError } from './api';
import { IMessage, MessageDB } from '@/types/Message';


export const chatsApi = {

	getList: async () => {
		try {
			const { data } = await $axios.get<{ chats: ChatDB[] }>('/chats');
			return data?.chats;
		} catch( error ) {
			handleAxiosError(error);
		}
	},

	create: async (chat: IChat, message: IMessage) => {
		try {
			const { data } = await $axios.post<{ chat: ChatDB }>('/chats', { chat, message });
			return data?.chat;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	remove: async (chatId: string) => {
		try {
			const { data } = await $axios.delete<{ chat: ChatDB }>(`/chats/${ chatId }`);
			return data.chat;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	getMessages: async (chatId: string) => {
		try {
			const { data } = await $axios.get<{ messages: MessageDB[] }>(`/chats/${chatId}/messages`);
			return data.messages;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	sendMessage: async (chatId: string, message: IMessage) => {
		try {
			const { data } = await $axios.post<{ message: MessageDB }>(`/chats/${chatId}/messages`, message);
			return data.message;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	removeMessage: async (chatId: string, messageId: string) => {
		try {
			const { data } = await $axios.delete<{ message: MessageDB }>(`/chats/${chatId}/messages/${messageId}`);
			return data.message;
		} catch (error) {
			handleAxiosError(error);
		}
	}
};