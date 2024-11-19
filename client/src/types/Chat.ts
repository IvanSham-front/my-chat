import { EntityDB } from './EntityDB';
import { IMessage, MessageDB } from './Message';

export interface IChat {
	type: 'private' | 'group';
	members: Array<string>;
	iconUrl?: string;
	lastMessage: IMessage | MessageDB;
}

export interface ChatDB extends IChat, EntityDB {}

export interface ChatState {
	currentChat: null | ChatDB;
	list: ChatDB[];
	chatMap: Map<string, MessageDB[]>;
}
