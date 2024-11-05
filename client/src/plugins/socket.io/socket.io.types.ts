export type emitsFromClient =
	| 'client:chats:list'
	| 'client:chats:create'
	| 'client:chats:delete'
	| 'client:messages:send'
	| 'client:messages:get-list';

export type emitsFromServer = 'server:chats:create' | 'servert:chats:delete' | 'server:messages:send';

export interface SocketEmitPayload {
	method: emitsFromClient | emitsFromServer;
	data?: any;
	callback(): any;
}
