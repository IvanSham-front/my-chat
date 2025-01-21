import { io, Socket } from 'socket.io-client';
import { ChatDB, IChat } from '@/types/Chat';
import { IMessage, MessageDB } from '@/types/Message';
import { reactive } from 'vue';

export const state = reactive({
	connected: false
});

interface EventMapFromClient {
	'client:chats:list': {},
	'client:chats:create': { chat: IChat; message: IMessage },
	'client:chats:delete': { chatId: string },
	'client:messages:get-list': { chatId: string },
	'client:messages:send': { chatId: string, message: IMessage }
}

interface ResponsesMap {

	'client:chats:list': { chats: ChatDB[] },
	'client:chats:create': ChatDB
	'client:chats:delete': ChatDB
	'client:messages:get-list': MessageDB[]
	'client:messages:send': { message: MessageDB }
}

type ResponseTypeEmit<K extends keyof ResponsesMap> = ResponsesMap[K];

type DataTypeEmit<K extends keyof EventMapFromClient> = EventMapFromClient[K];

interface EventMapFromServer {
	'server:chats:create': ChatDB;
	'servert:chats:delete': ChatDB;
	'server:messages:send': MessageDB;
}

type DataTypeOn<K extends keyof EventMapFromServer> = EventMapFromServer[K];

export class SocketService {
	private static instance: SocketService;
	private socket!: Socket;

	private constructor() {}

	public static getInstance(): SocketService {
		if (!this.instance) {
			this.instance = new SocketService();
		}
		return SocketService.instance;
	}

	isConnected() {
		return this.socket?.connected;
	}

	public initSocket(): Promise<void> {

		return new Promise(( resolve, reject ) => {

			try {
				this.socket = io('http://localhost:3020', {
					path: '/api/socket/',
					withCredentials: true,
				});

				this.socket.on('connect', () => {
					console.log('connected to the server');
					resolve();
				});

				this.socket.on('connect_error', (error) => {
					console.error('Connection error:', error.message);
				});

				this.socket.on('disconnect', () => {
					console.warn('Disconnected from the server.');
				});

			} catch (error) {
				console.error(error);
				reject(error);
			}
		
		});
		

	}

	public on<K extends keyof EventMapFromServer>(event: K, handler: (data: DataTypeOn<K>) => void) :void {
		if (this.socket?.connected) {
			// @ts-ignore
			this.socket.on(event, handler);
		} else {
			console.error('Socket is not connected.');
		}
	}

	public emit<K extends keyof EventMapFromClient>(
		event: K,
		data: DataTypeEmit<K>,
		callback?: (response: { data: ResponseTypeEmit<K>, status: 'ok' }) => void
	): void {
		if (!this.socket || !this.socket.connected) {
			console.error('Socket is not connected.');			
			return;
		}
		
		try {
			this.socket.emit(event, data, callback);
		} catch (err) {
			console.error(`Error sending event ${event}:`, err);
		}
		
	}
}