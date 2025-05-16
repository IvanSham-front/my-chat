import { UserDB } from '@/types/User';
import $axios, { handleAxiosError } from './api';

export const usersApi = {

	getUsersList: async (params: { login?: string; name?: string; surName?: string } = {}) => {

		const url = $axios.getQuery( '/users', params);

		try {

			const { data } = await $axios.get<{ users: UserDB[] }>( url );

			if (!data.users) {
				throw new TypeError(`Invalid response format, ${ data }`);
			}

			return data.users;

		} catch (error) {

			handleAxiosError(error);
			throw(error);

		}

	},

	getUserById: async (userId: string) => {

		try {

			const { data } = await $axios.get<{ user: UserDB }>(`/users/${ userId }`);

			if (!data.user) {
				throw new TypeError(`Invalid response format, ${ data }`);
			}

			return data.user;
			
		} catch (error) {
			
			handleAxiosError(error);
			throw(error);

		}

	},

	updateUserAvatar: async (userId: string, form: FormData) => {

		try {

			const { data } = await $axios.put<{ user: UserDB }>(`/users/${ userId }`, form);

			if (!data.user) {
				throw new TypeError(`Invalid response format, ${ data }`);
			}

			return data.user;
			
		} catch (error) {
			
			handleAxiosError(error);
			throw(error);

		}

	},

	updateUser: async ( user: UserDB ) => {

		try {

			const { data } = await $axios.put<{ user: UserDB}>(`/users/${ user.id }`, user);

			if (!data.user) {
				throw new TypeError(`Invalid response format, ${ data }`);
			}

			return data.user;
			
		} catch (error) {
			
			handleAxiosError(error);
			throw(error);

		}

	},

	removeUser: async ( userId: string ) => {

		try {

			const { data } = await $axios.delete<{ user: UserDB }> ( `users/${ userId }`);

			if (!data.user) {
				throw new TypeError(`Invalid response format, ${ data }`);
			}

			return data.user;
			
		} catch (error) {

			handleAxiosError(error);
			throw(error);

		}

	}

};	