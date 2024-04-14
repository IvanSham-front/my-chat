const ApiError = require('../exceptions/api-error');
const AccountServices = require('../services/account-services');

module.exports = {

	registration: async (req, res, next) => {

		try {

			const { login, password } = req.body;

			const accountServices = new AccountServices(req);

			const account = await accountServices.registration({
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

			const accountServices = new AccountServices(req);

			const accountData = await accountServices.login({ login, password });

			res.cookie('refreshToken', accountData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
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

			const accountServices = new AccountServices(req);

			const token = await accountServices.logout(refreshToken);

			res.clearCookie('refreshToken');

			return res.json( token );

		} catch (error) {

			next(error);

		}

	},

	refresh: async (req, res, next) => {

		try {

            const { refreshToken } = req.cookies;

			const accountServices = new AccountServices(req);

			const tokens = await accountServices.refresh( refreshToken );

			res.cookie('refreshToken', tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				secure: true,
			});
			
			res.json(tokens);
			
		} catch (error) {
			
			next(error);

		}

	},

	getAll: async (req, res, next) => {

		try {
			const Account = req.db.model('Account');


			const accounts = await Account.find();

			return res.json({ accounts });

		} catch (error) {

			next(error);
		}
	},
};
