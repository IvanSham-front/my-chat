const ApiError = require('../exceptions/api-error');

module.exports = {

	find: async (req, res, next) => {

		try {

			const { searchString } = req.query;

			const User = req.db.model('User');

			let users;

			if ( searchString ) {

				users = await User.find({
					$or: [
						{ login: { $regex: searchString || '', $options: 'i' } },
						{ name: { $regex: searchString || '', $options: 'i' } },
						{ surName: { $regex: searchString || '', $options: 'i' } },
					],
				});

				if (!users.length || !searchString) {

					throw ApiError.BadRequest('User not found');

				}

			} else {

				users = await User.find();

			}

			res.json({
				data: {
					users,
				},
			});

		} catch (error) {

			next(error);
			
		}
	},

	findById: async (req, res, next) => {

		try {

			const  { userId } = req.params;

			const User = req.db.model('User');

			const user = await User.findById(userId);

			if ( !user ) {

				ApiError.BadRequest( `User [ ${ userId } ] not found.` );

			}

			res.status( 200 ).json({
				data: {
					user,
				},
			});

		} catch (error) {

			next(error);

		}

	},

	update: async (req, res, next) => {

		try {

			const { userId } = req.params;
			const  account  = req.account;

			const User = req.db.model('User');
			const Account = req.db.model('Account');

			const user = await User.findById(userId);

			if ( !user ) {

				throw ApiError.BadRequest(`User [ ${ userId } ] not found.`)

			}

			if ( !account || account.login !== user.login ) {

				throw ApiError.BadRequest(`Cannot change another user's details`);

			}

			if ( Object.hasOwnProperty.call(req.body, 'login') ) {

				await Account.findOneAndUpdate( 
					{ login: account.login }, 
					{ login: req.body.login } 
				); 

			}

			await user.set( { ...req.body } );
			await user.save();

			res.status( 200 ).json({
				message: 'User updated successfully',
				data: {
					user,
				},
			});

		} catch (error) {

			next(error);

		}
	},

};
