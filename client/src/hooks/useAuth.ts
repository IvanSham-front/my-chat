import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/users/users';
import api from '@/api';
import { SocketService } from '@/api/socket.io/socket.io';

export const useAuth = () => {
	const userStore = useUserStore();
	const router = useRouter();

	const { authUser } = storeToRefs(userStore);

	const signin = async ({ login, password }: { login: string; password: string }) => {
		const res = await api.auth.login(login, password);

		if ( res?.data ) {
			userStore.setAuthUser(res.data.user);
			router.push('/');
		} else {
			return false;
		}
	};

	const signup = async ({ login, password }: { login: string; password: string }) => {
		const res = await api.auth.registration(login, password);

		if (res?.data) {
			await signin({ login, password });
		}
	};

	const logout = async () => {
		await api.auth.logout();
		router.push('/login');
	};

	const checkExsistLogin = async (login: string) => {
		const value = await api.auth.checkLogin(login);
		return value;
	};

	const connectSocket = () => {
		const socketService = SocketService.getInstance();
		socketService.initSocket();
	};

	return {
		authUser,
		signin,
		signup,
		checkExsistLogin,
		logout,
		connectSocket
	};
};
