import { UserDB } from '@/types/User';
import $axios, { ApiResponse, handleAxiosError } from './api';

interface UserResponse {
	user: UserDB;
}

export const auth = {
	registration: async (login: string, password: string) => {
		try {
			const { data } = await $axios.post<ApiResponse<UserResponse>>('/v1/auth/registration', { login, password });
			return data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	login: async (login: string, password: string) => {
		try {
			const { data } = await $axios.post<ApiResponse<UserResponse>>('/v1/auth/login', { login, password });
			return data;
		} catch (error) {
			handleAxiosError(error);
		}
	},

	logout: async () => {
		try {
			const res = await $axios.post('/v1/auth/logout');
			return res;
		} catch (error) {
			return error;
		}
	},

	checkLogin: async (login: string) => {
		try {
			const { data } = await $axios.post<ApiResponse<boolean>>('/v1/auth/checkLogin', { login });
			return data;
		} catch (error) {
			handleAxiosError(error);
		}
	},
};
