import { auth } from './auth';

const api = {
	// auth
	login: auth.login,
	registration: auth.registration,
	logout: auth.logout,
};

export default api;
