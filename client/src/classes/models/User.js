// import store from '@/store/index';

export class User {
	constructor(id, login, name, surName, status, avatarUrl, isOnline) {
		this.id = id;
		this.login = login;
		this.name = name;
		this.surName = surName;
		this.status = status;
		this.avatarUrl = avatarUrl;
		this.isOnline = isOnline;
	}
}

export class AuthUser extends User {
	constructor() {
		super();
	}
}

