import { EntityDB } from './EntityDB';
import { MessageDB } from './Message';

export interface IChat {
	type: 'private' | 'group';
	members: Array<string>;
	iconUrl?: string;
	lastMessage: MessageDB;
}

export interface ChatDB extends IChat, EntityDB {}

export interface ChatState {
	currentChat: null | ChatDB;
	chatMap: Map<
		string,
		{
			chat: ChatDB;
			messages: MessageDB[];
		}
	>;
}
