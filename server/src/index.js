const express = require('express');
const router = require('./routers');
const db = require('./dbo/index');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3020;

const app = express();
app.use(cookieParser());
// app.use(cors());

global.DB = db.connect();

app.use( express.json() );

app.listen( PORT, () => {
	
	console.log( `App listening on adress: http://localhost:${ PORT }` );
} );

app.use('/api', router);

module.exports = app;