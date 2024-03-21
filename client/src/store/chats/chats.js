const chatExamples = [];
const count = 5;

for (let i = 0; i < count; i++) {
	const randomNumber = Math.round(Math.random());

	const message = {
		id: Date.now(),
		text: 'Hello, my friend! How do you do? I am fine bla bla bla bla bla',
		sellerId: randomNumber === 0 ? 1 : 2,
		isRead: true,
		date: '21.03.24 16:53',
	};

	const chat = {
		id: i,
		type: 'private',
		lastMessage: message,
		members: [1, i + 2],
	};

	chatExamples.push(chat);
}

const chatModule = {
	state: {
		currentChat: null,
		list: chatExamples,
	},
	mutations: {
		select_current_chat(state, payload) {
			state.currentChat = payload;
		},
		unselect_current_chat(state) {
			state.currentChat = null;
		},
		set_chat_list(state, payload) {
			state.list = payload;
		},
		add_chat_list(state, payload) {
			state.list.push(payload);
		},
	},
	actions: {
		selectCurrentChat(context, payload) {
			context.commit('select_current_chat', payload);
		},
		unselectCurrentChat(context) {
			context.commit('unselect_current_chat');
		},
		setChatList(context, payload) {
			context.commit('set_chat_list', payload);
		},
		addChatList(context, payload) {
			context.commit('add_chat_list', payload);
		},
	},
	getters: {
		currentChat(state) {
			return state.currentChat;
		},
		chatList(state) {
			return state.list;
		},
	},
};

export default chatModule;
