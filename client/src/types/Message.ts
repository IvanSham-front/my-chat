import { EntityDB } from './EntityDB';

export interface Message {
	type: 'text' | 'audio' | 'attachment';
	sellerId: string;
	isRead?: boolean;
	chatId: string;
	text?: string;
}

export interface MessageDB extends Message, EntityDB {
	fileId?: string;
}

export interface MessagesState {
	list: Message[];
}
