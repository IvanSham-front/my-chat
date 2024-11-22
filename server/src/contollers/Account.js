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

			return res.json({
				data: {
					account,
				},
			});

		} catch (error) {

			next(error);

		}
	},

	checkLogin: async (req, res, next) => {

		try {

			const { login } = req.body;

			if ( !login ) {

				throw ApiError.BadRequest('No login or password');

			}

			
			const account = await AccountServices.checkLogin(login);

			return res.json({
				data: {
					exists: !!account
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

			const { tokens, user } = await AccountServices.login({ login, password });

			res.cookie('accessToken', tokens.accessToken, {
				maxAge: 2 * 60 * 60 * 1000,
				httpOnly: true,
				// secure: true, Потом включить надо
			});

			res.cookie('refreshToken', tokens.refreshToken, {
				maxAge: 3 * 24 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				// secure: true, Потом включить надо
			});

			return res.json({
				data: {
					user,
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
			res.clearCookie('accessToken');

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
