import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/users/users';
import api from '@/api';

export const useAuth = () => {
	const userStore = useUserStore();
	const router = useRouter();

	const { authUser } = storeToRefs(userStore);

	const signin = async ({ login, password }: { login: string; password: string }) => {
		const res = await api.login(login, password);

		if (typeof res === 'object') {
			userStore.setAuthUser(res.data.user);
			router.push('/');

			// тут следом будут подключаться сокеты и переход на другую страницу.
		}
	};

	const signup = async ({ login, password }: { login: string; password: string }) => {
		const res = await api.registration(login, password);

		if (typeof res === 'object') {
			await signin({ login, password });

		}
	};

	const logout = async () => {
		await api.logout();
		router.push('/login');
	};

	const checkLogin = (login: string) => {
		// проверка на логин

		console.debug(login);
	};

	return {
		authUser,
		signin,
		signup,
		checkLogin,
		logout
	};
};
