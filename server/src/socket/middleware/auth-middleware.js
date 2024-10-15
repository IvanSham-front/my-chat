const ApiError = require('../../exceptions/api-error');
const AccountServices = require('../../services/account-services');
const TokenServices = require('../../services/token-services');


module.exports = async function (socket, next) {

	try {

		const accessToken = socket.request.headers.cookie?.split('; ').find(row => row.startsWith('accessToken'))?.split('=')[1];

		const refreshToken = socket.request.headers.cookie?.split('; ').find(row => row.startsWith('refreshToken'))?.split('=')[1];

		if (!accessToken) {
			throw ApiError.UnauthorizedError();
		}

		let accountData = TokenServices.validateAccessToken(accessToken);

		if (!accountData) {
			accountData = await AccountServices.refresh(refreshToken);
		}

		if (!accountData) {
			throw ApiError.UnauthorizedError();
		}

		socket.account = accountData;

		next();

	} catch (error) {
		
		console.error('Auth');
		next(error);

	}

};


