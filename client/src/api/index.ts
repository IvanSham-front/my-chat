import { auth } from './auth';

const api = {
	// auth
	login: auth.login,
	registration: auth.registration,
	logout: auth.logout,
	checkLogin: auth.checkLogin,
};

export default api;
