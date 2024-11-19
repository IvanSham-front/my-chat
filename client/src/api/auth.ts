import { UserDB } from '@/types/User';
import $axios, { ApiResponse } from './api';
import { isAxiosError } from 'axios';

interface UserResponse {
	user: UserDB;
}

export const auth = {
	registration: async (login: string, password: string) => {
		try {
			const { data } = await $axios.post<ApiResponse<UserResponse>>('/v1/auth/registration', { login, password });
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				console.error('error message: ', error.message);
				return error.message;
			} else {
				console.log('unexpected error: ', error);
				return 'An unexpected error occurred';
			}
		}
	},

	login: async (login: string, password: string) => {
		try {
			const { data } = await $axios.post<ApiResponse<UserResponse>>('/v1/auth/login', { login, password });
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				console.error('error message: ', error.message);
				return error.message;
			} else {
				console.log('unexpected error: ', error);
				return 'An unexpected error occurred';
			}
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
};
