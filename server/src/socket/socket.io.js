const socketIo = require('socket.io');
const authMiddleware = require('./middleware/auth-middleware');
const validIdMiddleware = require('../middleware/valid-id-middleware');
// const registerOrderHandlers = require("./handlers/example");
const regisetChatsHandlers = require('./handlers/Chats');

function initializeSocket (server) {

	const io = socketIo(server, {
		cookie: true,
		path: '/api/socket/',
		credentials: true,
		cors: {
			origin: 'http://localhost:3000',
			credentials: true
		}
	});

	io.use(authMiddleware);

	const onConnection = (socket) => {
		regisetChatsHandlers(io, socket);
	}

	io.on('connection', (socket) => {

		console.log(socket);

		onConnection(socket);

		// socket.on('example', exampleCallback({ socket }))

		// Здесь можно обрабатывать события от клиентов
		socket.on('eventFromClient', (data, callback) => {

			console.log(data);
			callback({ status: 'success', data: 'Hello from Server!' });
			
		});

		// Обработка отключения клиента
		socket.on('disconnect', () => {
			console.log('Client disconnected');
		});

		socket.on('message', () => {
			socket.emit('bla', 'blalb')
		});

	});

	return io;

}

module.exports = initializeSocket;