import { EntityDB } from './EntityDB';

export interface IUser {
	login: string;
	name?: string;
	surName?: string;
	status?: string;
	avatarUrl?: string;
	color?: string;
}

export interface UserDB extends IUser, EntityDB {}

export interface UserState {
	usersMap: Map<string, UserDB>;
	authUser: UserDB | null;
}
