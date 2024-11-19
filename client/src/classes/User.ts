import { UserDB } from '@/types/User';

export class User implements UserDB {
	login!: string;
	name?: string;
	surName?: string;
	status?: string;
	avatarUrl?: string;
	color?: string;
	createdAt!: string;
	updatedAt!: string;
	id!: string;

	constructor (userData: UserDB) {
		Object.assign(this, userData);
	}

	static async find () {
		// поиск в сторе, если нет, то поиск на сервер 
	}

	update() {
		// отправка по http 	
	}

	getAvatar() {

		if ( this.avatarUrl ) {
			return this.avatarUrl;
		}

	}


}
