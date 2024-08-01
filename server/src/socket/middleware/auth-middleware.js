const ApiError = require('../../exceptions/api-error');
const TokenService = require('../../services/token-service');

module.exports = function (socket, next) {

	try {

		const accessToken = socket.handshake.headers.authorization;
		
		if (!accessToken) {
			throw ApiError.UnauthorizedError();
		}

		if (!accessToken) {
			throw ApiError.UnauthorizedError();
		}

		const accountData = TokenService.validateAccessToken(accessToken);

		if (!accountData) {
			throw ApiError.UnauthorizedError();
		}

		socket.account = accountData;

		next();

	} catch {

		return next(ApiError.UnauthorizedError())

	}

};


