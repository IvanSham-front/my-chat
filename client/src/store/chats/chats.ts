import { defineStore } from 'pinia';
import { ChatDB, ChatState } from '@/types/Chat';
import { MessageDB } from '@/types/Message';
import api from '@/api';
import { SocketService } from '@/api/socket.io/socket.io';

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
			const saveData = (chats: ChatDB[]) => {
				this.setChatList(chats);
				chats.forEach((chat) => {
					this.chatMap.set(chat.id, []);
				});
			};

			const socket = SocketService.getInstance();

			if (socket.isConnected()) {
				socket.emit('client:chats:list', {}, (response) => {
					if (response?.data?.chats) {
						saveData(response.data.chats);
					}
				});
			} else {
				const chats = await api.chats.getList();
				if (chats) {
					saveData(chats);
				}
			}
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
