import { io } from 'socket.io-client';

let socket = io('http://localhost:3020', {
	path: '/api/socket/',
	withCredentials: true,
});

socket.on('connect', () => {
	console.log(socket.id);

	socket.emit('chats:list', {}, (response) => {
		console.log(response);
	});

	// socket.emit('chats:create', {
	// 	chat: {
	// 		type: 'private',
	// 		members: ['661c0349970489a352c0aadc', '661c14a5a882c87f7d3b1690'],
	// 	},
	// 	message: {
	// 		text: 'Hello, friend!',
	// 		type: 'text',
	// 	},
	// });
});

socket.on('connect_error', (error) => {
	console.error('Connection error:', error);
});

// const user = { login: 'ivan', password: 'acer553g' };
// fetch('http://localhost:3020/api/auth/login', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json;charset=utf-8'
// 	},
// 	body: JSON.stringify(user),
// 	credentials: 'include'

// }).then(response => response.json());

export default {
	install(app, store) {
		if (!store.hasModule('socket')) {
			const storeModule = {
				state: {},

				mutations: {},

				actions: {},

				getters: {},
			};

			store.registerModule('socket', storeModule);
		}

		app.config.globalProperties.$socket = {
			connect() {
				socket = io('http://localhost:3020', {
					// path: '/api/',
					withCredentials: true,
				});
			},

			emit({ method, data, callback }) {
				socket.emit(method, data, callback);
			},
		};

		app.provide('socket', app.config.globalProperties.$socket);
	},
};