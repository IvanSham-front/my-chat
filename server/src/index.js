const express = require('express');
const router = require('./router');
const db = require('./dbo/index');


const PORT = process.env.PORT || 3020;

const app = express();

db.connect();


app.listen( PORT, () => {
	
	console.log( `App listening on adress: http://localhost:${ PORT }` );
} );

app.use('/', router);

module.exports = app;