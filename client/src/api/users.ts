import { UserDB } from '@/types/User';
import $axios, { handleAxiosError } from './api';

export const usersApi = {

	getUsersList: async (params: { login?: string; name?: string; surName?: string } = {}) => {

		const url = $axios.getQuery( '/users', params);

		try {

			const { data } = await $axios.get<{ users: UserDB[] }>( url );
			return data.users;

		} catch (error) {

			handleAxiosError(error);

		}

	},

	getUserById: async (userId: string) => {

		try {

			const { data } = await $axios.get<{ user: UserDB}>(`/users/${ userId }`);
			return data.user;
			
		} catch (error) {
			
			handleAxiosError(error);

		}

	},

	updateUser: async ( user: UserDB ) => {

		try {

			const { data } = await $axios.put<{ user: UserDB}>(`/users/${ user.id }`);
			return data.user;
			
		} catch (error) {
			
			handleAxiosError(error);

		}

	},

	removeUser: async ( userId: string ) => {

		try {

			const { data } = await $axios.delete<{ user: UserDB }> ( `users/${ userId }`);
			return data.user;
			
		} catch (error) {

			handleAxiosError(error);

		}

	}

};	