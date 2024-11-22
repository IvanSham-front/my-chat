import { io, Socket } from 'socket.io-client';
import { SocketEmitPayload } from './socket.io.types';

export class SocketService {
	private static instance: SocketService;
	private socket!: Socket;

	private constructor() {}

	public static getInstance(): SocketService {
		if ( !this.instance ) {
			this.instance = new SocketService();
		}
		return SocketService.instance;
	}

	public initSocket(): void {
		this.socket = io('http://localhost:3020', {
			path: '/api/socket/',
			withCredentials: true,
		});
	}

	public emit<T>({ method, data, callback }: SocketEmitPayload<T>) {
		this.socket.emit(method, data, callback);
	}

	

}