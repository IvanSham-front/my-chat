const socketIo = require('socket.io');
const authMiddleware = require('./middleware/auth-middleware');
const validIdMiddleware = require('../middleware/valid-id-middleware');
// const registerOrderHandlers = require("./handlers/example");
const registerChatsHandlers = require('./handlers/Chats');
const accountServices = require('../services/account-services');


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

	io.use( authMiddleware );

	const onConnection = (socket) => {
		registerChatsHandlers(socket);
	}

	io.on('connection', async (socket) => {

		await accountServices.saveSocketId( socket );

		onConnection(socket);

		socket.on('disconnect', () => {

			accountServices.removeSocketId( socket );

			console.log('Client disconnected');
		});

	});

	return io;

}

module.exports = initializeSocket;