import { defineStore } from 'pinia';
import { ChatDB, ChatState } from '@/types/Chat';
import { MessageDB } from '@/types/Message';
import ApiManager from '@/api/ApiManager';

export const useChatsStore = defineStore('chats', {
	state: (): ChatState => ({
		currentChat: null,
		list: [],
		chatMap: new Map(),
	}),

	actions: {
		selectCurrentChat(chat: ChatDB) {
			this.currentChat = chat;
		},

		unSelectCurrentChat() {
			this.currentChat = null;
		},

		setChatList(chatList: ChatDB[]) {
			this.list = chatList;
		},

		addToChatList(chat: ChatDB) {
			this.list.push(chat);
		},

		async getChatList() {
			const chats = await ApiManager.getChatList();
			this.setChatList(chats);
			
			chats.forEach((chat) => {
				this.chatMap.set(chat.id, []);
			});
		},
	},

	getters: {
		messagesCurrentChat: (state) => {
			if (state.currentChat) {
				return state.chatMap.get(state.currentChat.id);
			}

			return [];
		},

		messagesByChatId: (state) => (chatId: string): MessageDB[]=> {
			return state.chatMap.get(chatId) || [];
		},
	},
});
