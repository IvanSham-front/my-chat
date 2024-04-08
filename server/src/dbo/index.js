const mongoose = require( 'mongoose' );
const models = require( './models' );

/**
** When successfully connected.
**/
mongoose.connection.on( 'connected', () => {

	console.log( 'Mongoose default connection open' );

} );

/**
** If the connection throws an error.
**/
mongoose.connection.on( 'error', err => {

	console.log( 'Mongoose default connection error:', err );

} );

/**
** When the connection is disconnected.
**/
mongoose.connection.on( 'disconnected', () => {

	console.log( 'Mongoose default connection disconnected' );

} );

/**
** If the Node process ends, 
** close the Mongoose connection.
**/
process.on( 'SIGINT', async () => {

	// console.debug( 'Process received SIGINT' );
	await mongoose.connection.close();
	process.exit();
	
	// const message = 'Mongoose default connection disconnected through app termination';    
	// shutdown( message );

} );

/**
** If the Node process ends, 
** close the Mongoose connection.
**/
process.on( 'SIGTERM', async () => {

	await mongoose.connection.close();
	process.exit();

} );


/**
** @see https://mongoosejs.com/docs/api/connection.html#Connection.prototype.useDb()
**/
const host = process.env.NODE_ENV == 'production' 
	? '0.0.0.0' // '127.0.0.1'
	// : 'localhost'; // If Nodejs > (v17.x), then try updating mongodb url from localhost to 127.0.0.1
	: '127.0.0.1';

const options = {
	
	useNewUrlParser: true,
	useUnifiedTopology: true,

	connectTimeoutMS: 10000,
	socketTimeoutMS: 30000,

};

const connect = async () => {

	try {

		await mongoose.connect( `mongodb://${ host }:27017/my_chat` );
		console.log( 'Mongoose connected to MongoDB' );

		Object.keys(models).forEach(key => {

			mongoose.model(key, models[key]);
			
        });

	} catch (error) {
        console.error('Mongoose connection error:', error);
    }

}



module.exports = { connect };