const mongoose = require('mongoose'); 
const ApiError = require('../exceptions/api-error');

module.exports = function (req, res, next) {

	try {

		const ids = { ...req.params };

		Object.keys( ids ).forEach(key => {

			if ( !mongoose.Types.ObjectId.isValid( ids[ key ] ) ) {

				throw ApiError.BadRequest( `[ ${ ids[ key ] } ] is not valid ${ key }` );

			}

		})

		next();

	} catch (error) {

		next(error);

	}

};