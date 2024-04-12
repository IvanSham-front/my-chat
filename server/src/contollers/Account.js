const AccountServices = require("../services/account-services");


module.exports = {

	registration: async (req, res) => {

		try {

			const { login, password } = req.body;

			const accountServices = new AccountServices(req);

			const account = await accountServices.registration( { login, password } );

			if (!account) {
				return res.status(500).json({
					message: 'A user with this login already exists'
				})
			}

			res.cookie('refreshToken', account.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				secure: true
			} );

			return res.json({
				data: {
					account
				}
			})

		} catch (error) {

			return res.status(500).json({
				name: error.name,
				message: error.message,
				stack: error.stack,
			});

		}

	}

};