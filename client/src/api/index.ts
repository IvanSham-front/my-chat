import { auth } from './auth';
import { chatsApi } from './chats';

const api = {
	// auth
	auth: { ...auth },
	chats: { ...chatsApi },
	
};

export default api;
