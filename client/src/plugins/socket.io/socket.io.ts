import { io, Socket } from 'socket.io-client';
import { ChatDB, IChat } from '@/types/Chat';
import { IMessage, MessageDB } from '@/types/Message';


interface EventMapFromClient {
	'clent:chats:list': ChatDB[],
	'client:chats:create': { chat: IChat; message: IMessage },
	'client:chats:delete': { chatId: string },
	'client:messages:get-list': { chatId: string }
}

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

	public initSocket(): void {
		try {
			this.socket = io('http://localhost:3020', {
				path: '/api/socket/',
				withCredentials: true,
			});

			this.socket.on('connect', () => {
				console.log('connected to the server');
			});


			this.socket.on('connect_error', (error) => {
				console.error('Connection error:', error.message);
			});

			this.socket.on('disconnect', () => {
				console.warn('Disconnected from the server.');
			});
		} catch (error) {
			console.error(error);
		}

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
		callback?: (response: any) => void
	): void {
		if (this.socket.connected) {
			try {
				this.socket.emit(event, data, callback);
			} catch (err) {
				console.error(`Error sending event ${event}:`, err);
			}
		} else {
			console.error('Socket is not connected.');
		}
	}
}