import api from '@/api';
import { UserDB, UserState } from '@/types/User';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
	state: (): UserState => ({
		list: [],
		authUser: null,
	}),

	actions: {
		setList(payload: UserDB[]) {
			this.list = payload;
		},

		setAuthUser(payload: UserDB) {
			this.authUser = payload;
		},


		async getAuthUser ()  {
			const res = await api.auth.getAuthUser();
			if (res?.data) {
				this.setAuthUser(res.data.user);
				return res.data.user;
			}
		}

	},

	getters: {
		getUserById: (state) => (id: string): UserDB | null => {
			const user = state.list.find((item) => item.id === id);
			return user || null;
		},
	},
});
