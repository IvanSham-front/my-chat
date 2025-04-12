import { defineStore } from 'pinia';
import { ChatDB, ChatState, IChat } from '@/types/Chat';
import { IMessage, MessageDB } from '@/types/Message';
import ApiChatManager from '@/api/ApiChatManager';

export const useChatsStore = defineStore('chats', {
	state: (): ChatState => ({
		currentChat: null,
		chatMap: new Map(),
	}),

	actions: {

		selectCurrentChat(chat: ChatDB) {
			this.currentChat = chat;
		},

		unSelectCurrentChat() {
			this.currentChat = null;
		},

		addChatItem(chat: ChatDB) {
			this.chatMap.set(chat.id, { chat, messages: [] });
		},

		addMessageOnChat(chatId: string, message: MessageDB) {

			const chat = this.chatMap.get(chatId);
			if (chat) {
				chat.messages.push(message);
			}

		},

		async getChatList() {

			const chats = await ApiChatManager.getChatList();
			chats.forEach((chat) => {
				this.addChatItem( chat );
			});


		},

		async createChat(chat: IChat, message: IMessage) {

			const response = await ApiChatManager.createChat(chat, message);
			this.addChatItem(response);
			
		},

		async sendMessage (chatId: string, message: IMessage ) {

			const responseMessage = await ApiChatManager.sendMessage(chatId, message);
			this.addMessageOnChat(chatId, responseMessage);

		},

		async getMessagesByChatId (chatId: string) {
			
			const messages = await ApiChatManager.getMessagesByChatId( chatId );
			
			messages.forEach(message => {
				this.sendMessage(chatId, message);
			});

		},

	},

	getters: {

		chatList: (state): ChatDB[] => {
			return Array.from( state.chatMap.values() ).map( item => item.chat );
		},

		messagesByChatId: (state) => (chatId: string): MessageDB[]=> {
			return state.chatMap.get(chatId)?.messages || [];
		},

	},
});
