const mongoose = require('mongoose'); 
const ApiError = require('../exceptions/api-error');

module.exports = function (req, res, next) {

	try {

		const  { userId } = req.params;

		if ( !mongoose.Types.ObjectId.isValid(userId) ) {

			throw ApiError.BadRequest( `[ ${ userId } ] is not valid user id` );

		}

		next();

	} catch (error) {

		next(error);

	}

};