import { ChatDB } from '@/types/Chat';

export type emitsFromClient =
	| 'client:chats:list'
	| 'client:chats:create'
	| 'client:chats:delete'
	| 'client:messages:send'
	| 'client:messages:get-list';

export type emitsFromServer = 'server:chats:create' | 'servert:chats:delete' | 'server:messages:send';

export interface ServerEventPayloads {
	'server:chats:create': ChatDB;
	'server:chats:delete': { chatId: string };
	'server:messages:send': { chatId: string; message: string; senderId: string };
}

export interface SocketEmitPayload<T> {
	method: emitsFromClient | emitsFromServer;
	data?: T;
	callback(): any;
}
