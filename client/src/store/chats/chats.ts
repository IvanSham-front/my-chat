import { ChatDB, ChatState } from '@/types/Chat';
import { MessageDB } from '@/types/Message';
import { defineStore } from 'pinia';

export const useChatsStore = defineStore( 'chats', {

	state: (): ChatState => ({

		currentChat: null,
		list: [],
		chatMap: new Map()
	
	}),

	actions: {

		selectCurrentChat( chat: ChatDB ) {
			this.currentChat = chat;
		},

		unSelectCurrentChat() {
			this.currentChat = null;
		},

		setChatList( chatList: ChatDB[] ) {
			this.list = chatList;
		},

		addToChatList( chat: ChatDB ) {
			this.list.push( chat );
		}

	},

	getters: {

		getMessagesCurrentChat: (state) => {

			if ( state.currentChat ) {

				return state.chatMap.get(state.currentChat.id);

			} 

			return [];

		},

		getMessagesByChatId : (state) => (chatId: string): MessageDB[] | undefined => {
			return state.chatMap.get(chatId);
		},

	}

} );
