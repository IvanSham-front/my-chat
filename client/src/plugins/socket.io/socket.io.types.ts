import { ChatDB, IChat } from '@/types/Chat';
import { IMessage, MessageDB } from '@/types/Message';

export type emitsFromClient ='client:chats:delete' | 'client:messages:get-list' | 'client:chats:list' | 'client:chats:create';

export interface ClientToServerEvents {
	'client:chats:list': (data: SocketEmitPayload<{}, ChatDB[]>) => void;

	'client:chats:create': (
		data: SocketEmitPayload<
			{
				chat: IChat;
				message: IMessage;
			},
			ChatDB
		>
	) => void;

	'client:chats:delete': (
		data: SocketEmitPayload<
			{
				chatId: string;
			},
			ChatDB
		>
	) => void;

	'client:messages:get-list': (data: SocketEmitPayload<{ chatId: string }, ChatDB[]>) => void;
}

export interface ServerToClientEvents {
	'server:chats:create': (chat: IChat) => ChatDB;
	'servert:chats:delete': (chatId: string) => ChatDB;
	'server:messages:send': (message: IMessage) => MessageDB;
}

export interface SocketEmitPayload<T, R> {
	method: emitsFromClient;
	data: T;
	callback(): { status: 'ok'; data: R };
}
