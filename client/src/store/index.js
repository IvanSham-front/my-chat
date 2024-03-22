import { createStore } from 'vuex';
import chatModule from './chats/chats';
import users from './users/users';
import messages from './messages/messages';
import colors from './colors/colors';
import sidebar from './sidebar/sidebar';

const store = createStore({
	modules: {
		chats: chatModule,
		users,
		messages,
		colors,
		sidebar
	},
});

export default store;
