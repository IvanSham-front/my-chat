const ApiError = require('../exceptions/api-error');
const AccountServices = require('../services/account-services');

module.exports = {

	registration: async (req, res, next) => {

		try {

			const { login, password } = req.body;

			const account = await AccountServices.registration({
				login,
				password,
			});

			res.cookie('refreshToken', account.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				secure: true,
			});

			return res.json({
				data: {
					account,
				},
			});

		} catch (error) {

			next(error);

		}
	},

	login: async (req, res, next) => {

		try {

			const { login, password } = req.body;

			if ( !login || !password ) {

				throw ApiError.BadRequest('No login or password');

			}

			const accountData = await AccountServices.login({ login, password });

			res.cookie('refreshToken', accountData.refreshToken, {
				maxAge: 3 * 24 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				secure: true,
			});

			return res.json({
				data: {
					...accountData,
				},
			});

		} catch (error) {
			console.log(error);
			next(error);

		}
	},

	logout: async (req, res, next) => {

		try {

            const { refreshToken } = req.cookies;

			const token = await AccountServices.logout(refreshToken);

			res.clearCookie('refreshToken');

			return res.json( token );

		} catch (error) {

			next(error);

		}

	},

	refresh: async (req, res, next) => {

		try {

            const { refreshToken } = req.cookies;

			const tokens = await AccountServices.refresh( refreshToken );

			res.cookie('refreshToken', tokens.refreshToken, {
				maxAge: 3 * 24 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				secure: true,
			});
			
			res.json(tokens);
			
		} catch (error) {
			
			next(error);

		}

	},

	remove: async (req, res, next) => {

		try {

			const { userId } = req.params;

			const userData = await AccountServices.remove( userId );

			res.json(`User ${ userData?.id } was successfully deleted`);

			
		} catch (error) {
			
			next(error);

		}

	}

};
