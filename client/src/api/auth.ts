import { UserDB } from '@/types/User';
import $axios, { ApiResponse, handleAxiosError } from './api';

interface UserResponse {
	user: UserDB;
}

export const auth = {

	registration: async (login: string, password: string) => {

		try {

			const { data } = await $axios.post<UserResponse>('/auth/registration', { login, password });
			
			if (!data?.user) {
				throw new TypeError(`Invalid response format, ${ data }`);
			};

			return data.user;

		} catch (error) {

			handleAxiosError(error);
			throw error;

		}

	},

	login: async (login: string, password: string) => {

		try {

			const { data } = await $axios.post<UserResponse>('/auth/login', { login, password });
			
			if (!data?.user) {
				throw new TypeError(`Invalid response format, ${ data }`);
			};

			return data.user;

		} catch (error) {

			handleAxiosError(error);
			throw error;
			
		}

	},

	logout: async () => {

		try {
			const res = await $axios.post('/auth/logout');
			return res;

		} catch (error) {

			handleAxiosError(error);
			throw error;
			
		}

	},

	checkLogin: async (login: string) => {

		try {

			const { data } = await $axios.post<ApiResponse<boolean>>('/auth/checkLogin', { login });

			if (typeof data !== 'boolean') {
				throw new TypeError(`Invalid response format, ${ data }`);
			}

			return data;

		} catch (error) {

			handleAxiosError(error);
			throw error;

		}

	},

	getAuthUser: async () => {

		try {

			const { data } = await $axios.get<{ user: UserDB }>('/auth/user');
			
			if (!data?.user) {
				throw new TypeError(`Invalid response format, ${ data }`);
			};

			return data.user;

		} catch (error) {

			handleAxiosError(error);
			throw error;

		}

	}
	
};
