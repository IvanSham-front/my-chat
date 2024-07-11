const AccountServices = require('../services/account-services');
const MessageServices = require('../services/message-services');
const FileServices = require('../services/file-services');

module.exports = {

	send: async (req, res, next) => {

		try {

			const account = req.account;

			const { chatId } = req.params;

			const user = await AccountServices.getUserByAccount(account);

			if ( req.files ) {

				const file =  await FileServices.uploadFile(req.files.file, user.id);
				req.body.fileId = file.id;
			}

			const message = await MessageServices.send({
				message: {
					...req.body,
					chatId
				},
				sellerId: user.id,
			});

			res.json({
				message: 'Message send successfully',
				data: {
					message,
				},
			});

		} catch (error) {

			next(error);
			
		}
	},

	remove: async ( req, res, next ) => {

		try {

			const { messageId } = req.params;

			const message = await MessageServices.remove(messageId);

			res.json({
				message: 'Message deleted successfully',
				data: {
					message
				}
			})
			
		} catch (error) {
			
			next(error);

		}

	},

	getMessagesByChatId: async (req, res, next) => {

		try {

			const account = req.account;

			const user = await AccountServices.getUserByAccount(account);

			const { chatId } = req.params;

			const messages = await MessageServices.getMessagesByChatId( { chatId, userId: user.id} );

			res.json({
				data: {
					messages
				}
			})

		} catch(error) {

			next(error);

		}

	}

};
