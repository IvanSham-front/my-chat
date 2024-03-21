import { createStore } from 'vuex';
import chatModule from './chats/chats';
import users from './users/users';
import messages from './messages/messages';

const store = createStore({
	modules: {
		chats: chatModule,
		users,
		messages
	},
});

export default store;
