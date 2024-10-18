import { User, UserState } from "@/types/User";
import { defineStore } from "pinia";

const useUserStore = defineStore( 'users', {

	state: (): UserState => ({
	
		list: [],

	}),

	actions: {

		setList( payload: User[] ) {

			this.list = payload;

		},

	},

	getters: {

		getUserById: ( state ) => ( id: string  ) => {
			const user = state.list.find((item) => item.id === id);
			return user || null;
		},

	}

} );