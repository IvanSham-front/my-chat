const socketIo = require('socket.io');
const authMiddleware = require('./middleware/auth-middleware');
const validIdMiddleware = require('../middleware/valid-id-middleware');
// const registerOrderHandlers = require("./handlers/example");
const registerMessageHanlers = require('./handlers/Messages');
const exampleCallback = require('./handlers/example');

function initializeSocket (server) {

	const io = socketIo(server, {
		cookie: true,
	});


	io.use(authMiddleware);

	const onConnection = (socket) => {
		registerMessageHanlers(io, socket);
	}

	io.on('connection', (socket) => {

		onConnection(socket);

		socket.on('example', exampleCallback({ socket }))

		// Здесь можно обрабатывать события от клиентов
		socket.on('eventFromClient', (data) => {
			console.log(data);
			// Обработка данных и отправка ответа
			socket.emit('eventFromServer', { message: 'Hello from server!' });
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