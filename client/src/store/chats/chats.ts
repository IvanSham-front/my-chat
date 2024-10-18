// const chatExamples = [];
// const count = 5;


// for (let i = 0; i < count; i++) {
// 	const randomNumber = Math.round(Math.random());

// 	const message = {
// 		id: Date.now(),
// 		text: 'Hello, my friend! How do you do? I am fine bla bla bla bla bla',
// 		sellerId: randomNumber === 0 ? 1 : 2,
// 		isRead: true,
// 		date: '21.03.24 16:53',
// 	};

// 	const chat = {
// 		id: i,
// 		type: 'private',
// 		lastMessage: message,
// 		members: [1, i + 2],
// 	};

// 	chatExamples.push(chat);
// }

import { Chat, ChatState } from '@/types/Chat';
import { defineStore } from 'pinia';

export const useChatsStore = defineStore( 'chats', {

	state: (): ChatState => ({

		currentChat: null,
		list: []
	
	}),

	actions: {

		selectCurrentChat( chat: Chat ) {
			this.currentChat = chat;
		},

		unSelectCurrentChat() {
			this.currentChat = null;
		},

		setChatList( chatList: Chat[] ) {
			this.list = chatList;
		},

		addToChatList( chat: Chat) {
			this.list.push( chat );
		}

	},

} );
