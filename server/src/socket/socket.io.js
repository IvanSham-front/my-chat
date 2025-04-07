const socketIo = require('socket.io');
const authMiddleware = require('./middleware/auth-middleware');
const registerChatsHandlers = require('./handlers/Chats');
const registerMessagesHandlers = require('./handlers/Messages');
const accountServices = require('../services/account-services');
const logger = require('../logger');

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
		registerChatsHandlers(io, socket);
		registerMessagesHandlers(io, socket);
	}

	io.on('connection', async (socket) => {

		try {
			
			await accountServices.saveSocketId( socket );

			logger.info( `Client is connected: ${ socket.id }` );

			onConnection(socket);

		} catch( error ) {
			console.error( 'Error saving socket ID:', error );
			logger.error(error);
		}

		socket.on('disconnect', () => {

			logger.info(`Client disconnected: ${ socket.id }`);

            try {
                accountServices.removeSocketId(socket);
            } catch (error) {
                console.error('Error removing socket ID:', error);
				logger.error(error);
            }

		});

	});

	return io;

}

module.exports = initializeSocket;