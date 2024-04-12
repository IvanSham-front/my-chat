const express = require('express');
const router = require('./components/routers');
const db = require('./dbo/index');

const PORT = process.env.PORT || 3020;

const app = express();

global.DB = db.connect();

app.use( express.json() );

app.listen( PORT, () => {
	
	console.log( `App listening on adress: http://localhost:${ PORT }` );
} );

app.use('/', router);

module.exports = app;