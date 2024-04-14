const ApiError = require('../exceptions/api-error');
const TokenService = require('../services/token-service');

module.exports = function (req, res, next) {

	try {

		const authorizationHeader = req.headers.authorization;
		
		if (!authorizationHeader) {
			throw ApiError.UnauthorizedError();
		}

		const accessToken = authorizationHeader.split(' ')[1];

		if (!accessToken) {
			throw ApiError.UnauthorizedError();
		}

		const accountData = TokenService.validateAccessToken(accessToken);

		if (!accountData) {
			throw ApiError.UnauthorizedError();
		}

		req.account = accountData;

		next();

	} catch {

		return next(ApiError.UnauthorizedError())

	}

};