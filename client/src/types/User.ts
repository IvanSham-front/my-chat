import { EntityDB } from "./EntityDB";

export interface User {
	login: string;
	name?: string;
	surName?: string;
	status?: string;
	avatarUrl?: string;
	color?: string;
	id: string
};

export interface UserDB extends User, EntityDB {}

export interface UserState {
	list: UserDB[]
	authUser: UserDB | null
}