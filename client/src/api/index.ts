import { auth } from './auth';
import { chatsApi } from './chats';
import { filesApi } from './files';
import { usersApi } from './users';

const api = {

	auth: { ...auth },
	chats: { ...chatsApi },
	users: { ...usersApi },
	files: { ...filesApi },
	
};

export default api;
