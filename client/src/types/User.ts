export interface User {
	login: string;
	name?: string;
	surName?: string;
	status?: string;
	avatarUrl?: string;
	color?: string;
	id: string
};

export interface UserState {
	list: User[]
}