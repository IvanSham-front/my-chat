module.exports = {

	create: async (req, res) => {
	
		try {

			const body = { ...req.body };

			const User = req.db.model('User');

			const existingUser = await User.findOne({
				login: body.login,
			});

			if (existingUser) {
				return res.status(500).json({
					message: 'A user with this login already exists',
				});
			}

			const user = await User.create({ ...req.body });

			res.json({
				message: 'User created successfully',
				data: {
					user,
				},
			});

		} catch (error) {

			return res.status(500).json({
				name: error.name,
				message: error.message,
				stack: error.stack,
			});

		}
	},

	find: async (req, res) => {

		try {

			const { searchString } = req.query;

			const User = req.db.model('User');

			const users = await User.find({
				$or: [
					{ login: { $regex: searchString || '', $options: 'i' } },
					{ name: { $regex: searchString || '', $options: 'i' } },
					{ surName: { $regex: searchString || '', $options: 'i' } },
				],
			});

			if (!users.length || !searchString) {
				return res.status(404).json({
					message: 'User not found',
				});
			}

			res.json({
				data: {
					users,
				},
			});

		} catch (error) {

			return res.status(500).json({
				name: error.name,
				message: error.message,
				stack: error.stack,
			});
			
		}
	},

	findById: async (req, res) => {

		try {

			const  { userId } = req.params;

			const User = req.db.model('User');

			const user = await User.findById(userId);

			if ( !user ) {

				return res.status( 404 ).json( { 
					message: `User [ ${ userId } ] not found.`,
				} );

			}

			res.status( 200 ).json({
				data: {
					user,
				},
			});

		} catch (error) {

			return res.status(500).json({
				name: error.name,
				message: error.message,
				stack: error.stack,
			});

		}

	},

	update: async (req, res) => {

		try {

			const { userId } = req.params;

			const User = req.db.model('User');

			const user = await User.findById(userId);

			if ( !user ) {

				return res.status( 404 ).json( { 
					message: `User [ ${ userId } ] not found.`,
				} );

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

			return res.status(500).json({
				name: error.name,
				message: error.message,
				stack: error.stack,
			});

		}
	},

	delete: async (req, res) => {

		try {

			const { userId } = req.params;

			const User = req.db.model('User');

			const user = await User.findByIdAndDelete(userId);
			
			if ( !user ) {

				return res.status( 404 ).json( { 
					message: `User [ ${ userId } ] not found.`,
				} );

			}

			res.status( 200 ).json({
				message: 'User remove successfully',
			});

		} catch (error) {

			return res.status(500).json({
				name: error.name,
				message: error.message,
				stack: error.stack,
			});

		}
	}
};
