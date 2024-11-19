import { EntityDB } from './EntityDB';

export interface IMessage {
	type: 'text' | 'audio' | 'attachment';
	text?: string;
	file?: File
}

export interface MessageDB extends IMessage, EntityDB {
	sellerId: string;
	isRead?: boolean;
	chatId: string;
	fileId?: string;
}

export interface MessagesState {
	list: MessageDB[];
}
