const ApiError = require('../exceptions/api-error');
const TokenServices = require('../services/token-services');
const AccountService = require('../services/account-services');
const logger = require('../logger');

module.exports = async function (req, res, next) {

	try {

		const accessToken = req.headers.cookie?.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];
		const refreshToken = req.headers.cookie?.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];

		if (!accessToken) {
			throw ApiError.UnauthorizedError();
		}

		let accountData = TokenServices.validateAccessToken(accessToken);

		if (!accountData) {
			
			accountData = await AccountService.refresh(refreshToken);

		}

		if (!accountData) {
			
			throw ApiError.UnauthorizedError();

		}

		req.account = accountData;

		next();

	} catch {

		return next(ApiError.UnauthorizedError())

	}

};