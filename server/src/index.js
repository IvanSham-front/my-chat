const express = require('express');
const http = require('http');
const router = require('./routers');
const db = require('./dbo/index');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const errorMidleware = require('./middleware/error-middleware');
const initializeSocket = require('./socket/socket.io');

dotenv.config();

const PORT = process.env.PORT || 3020;

const app = express();

const server = http.createServer(app);

const io = initializeSocket(server);

app.use(cookieParser());

app.use(fileUpload());

// app.use(cors());

global.DB = db.connect();

app.use( express.json() );

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use( '/api', router );

app.use( errorMidleware );

server.listen( PORT, () => {
	
	console.log( `App listening on adress: http://localhost:${ PORT }` );

} );


module.exports = app;