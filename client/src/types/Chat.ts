import { EntityDB } from "./EntityDB";
import { Message, MessageDB } from "./Message";

export interface Chat {
	type: 'private' | 'group'
	members: Array<string>,
	iconUrl?: string,
	lastMessage: Message | MessageDB
}

export interface ChatDB extends Chat, EntityDB {};


export interface ChatState {

	currentChat: null | ChatDB,
	list: ChatDB[],
	chatMap: Map<string, MessageDB[]>

}