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

		try {

			const user = await api.auth.login(login, password);

			if ( user ) {

				userStore.setAuthUser( user );
				router.push('/');

			} else {

				throw new Error('User are not defined');

			}

		} catch {

			throw false;

		}

	};

	const signup = async ({ login, password }: { login: string; password: string }) => {

		try {

			const user = await api.auth.registration(login, password);

			if (user) {
				await signin({ login, password });
			}

		} catch(error) {

			throw (error);

		}
		
	};

	const logout = async () => {

		try {

			await api.auth.logout();
			router.push('/login');

		} catch(error) {

			throw error;

		}

	};

	const checkExsistLogin = async (login: string) => {

		try {

			const value = await api.auth.checkLogin(login);
			return value;

		} catch(error) {

			throw error;

		}

	};

	const connectSocket = async () => {
		const socketService = SocketService.getInstance();
		await socketService.initSocket();
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
