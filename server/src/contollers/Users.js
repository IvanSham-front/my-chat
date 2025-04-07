const ApiError = require('../exceptions/api-error');
const FileServices = require('../services/file-services');

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
				users,
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
				user,
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

			if ( req.files ) {

				if (req.files.avatar) {

					const typeFile = FileServices.getFileType(req.files.avatar.mimetype);

					if (typeFile !== 'image') {

						throw ApiError.BadRequest('The file can only be an image');

					}

				}
				
				const file = await FileServices.uploadFile(req.files.avatar, user.id);

				if (file) {

					req.body.avatarUrl = `/users/avatar/${file.id}`;

				}
			}

			await user.set( { ...req.body } );
			await user.save();

			res.status( 200 ).json({
				message: 'User updated successfully',
				user,
			});

		} catch (error) {

			next(error);

		}
	},

	getAvatar: async (req, res, next) => {

		try {

			const  { fileId } = req.params;

			const File = req.db.model('File');

			const file = await File.findById(fileId);

			if ( !file ) {

				ApiError.BadRequest( `File [ ${ fileId } ] not found.` );

			}

			const { fileStream, head } = await FileServices.sendFileStream(fileId);

			res.writeHead(200, head);

			fileStream.pipe(res);
			
		} catch (error) {
			
			next(error);

		}

	}

};
