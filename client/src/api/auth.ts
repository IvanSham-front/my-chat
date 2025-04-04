import { UserDB } from '@/types/User';
import $axios, { ApiResponse, handleAxiosError } from './api';

interface UserResponse {
	user: UserDB;
}

export const auth = {

	registration: async (login: string, password: string) => {

		try {

			const { data } = await $axios.post<ApiResponse<UserResponse>>('/auth/registration', { login, password });
			return data;

		} catch (error) {

			handleAxiosError(error);

		}

	},

	login: async (login: string, password: string) => {

		try {

			const { data } = await $axios.post<ApiResponse<UserResponse>>('/auth/login', { login, password });
			return data;

		} catch (error) {

			handleAxiosError(error);
			
		}

	},

	logout: async () => {

		try {
			const res = await $axios.post('/auth/logout');
			return res;

		} catch (error) {

			return error;

		}

	},

	checkLogin: async (login: string) => {

		try {

			const { data } = await $axios.post<ApiResponse<boolean>>('/auth/checkLogin', { login });
			return data;

		} catch (error) {

			handleAxiosError(error);

		}

	},

	getAuthUser: async () => {

		try {

			const { data } = await $axios.get<ApiResponse<UserResponse>>('/auth/user');
			return data;

		} catch (error) {

			handleAxiosError(error);

		}

	}
	
};
