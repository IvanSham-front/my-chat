const socketIo = require('socket.io');
const authMiddleware = require('./middleware/auth-middleware');
const registerChatsHandlers = require('./handlers/Chats');
const registerMessagesHandlers = require('./handlers/Messages');
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
		registerChatsHandlers(io, socket);
		registerMessagesHandlers(io, socket);
	}

	io.on('connection', async (socket) => {

		try {
			
			await accountServices.saveSocketId( socket );

			onConnection(socket);

		} catch( error ) {

			console.error( 'Error saving socket ID:', error );

		}

		socket.on('disconnect', () => {

			console.log('Client disconnected:', socket.id);

            try {
                accountServices.removeSocketId(socket);
            } catch (err) {
                console.error('Error removing socket ID:', err);
            }

		});

	});

	return io;

}

module.exports = initializeSocket;