import api from '@/api';
import { UserDB, UserState } from '@/types/User';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
	state: (): UserState => ({
		usersMap: new Map(),
		authUser: null,
	}),

	actions: {

		addUserItem( user: UserDB ) {
			this.usersMap.set( user.id, user );
		},
		
		setList(payload: UserDB[]) {
			
			payload.forEach(( item ) => {
				this.addUserItem( item );
			});
			
		},

		setAuthUser(payload: UserDB) {
			this.authUser = payload;
		},

		async getAuthUser ()  {

			if ( !this.authUser ) {

				const res = await api.auth.getAuthUser();

				if (res) {

					this.setAuthUser(res.user);
					this.addUserItem(res.user);
					return res.user;

				}

			} else {

				return this.authUser;

			}

		},

		async loadUserById( userId: string ) {

			const user = await api.users.getUserById( userId );

			if (user) {
				
				this.addUserItem(user);
				return user;

			}

		},

		async findUserById( userId: string ) {

			const user = this.getUserById ( userId ); // это геттер
			
			if (user) {

				return user;

			} else {

				return await this.loadUserById( userId ); // это запрос на сервер
				
			}

		}

	},

	getters: {

		getUserById: (state) => (id: string): UserDB | null => {
			return state.usersMap.get(id) || null;
		},

		fullNameById() {

			return (id: string): string => {

				const user = this.getUserById(id); 
				return user ? `${user.name || ''} ${user.surName || ''}` : '';

			};
		},
	},
});
