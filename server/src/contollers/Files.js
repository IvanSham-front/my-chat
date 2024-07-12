const ApiError = require('../exceptions/api-error');
const FileServices = require('../services/file-services');
const path = require('path');
const fs = require('fs');

module.exports = {

	getStreamFile: async (req, res, next) => {

		try {

			const { fileId } = req.params;
			const { range } = req.headers;

			const { fileStream, head } = await FileServices.sendFileStream(fileId, range);

			const code = 'Content-Range' in head 
				? 206 
				: 200;

			res.writeHead(code, head);

			fileStream.pipe(res);
			
		} catch (error) {
			
			next(error);

		}

	},

	download: async (req, res, next) => {

		try {

			const { fileId } = req.params;
			const File = req.db.model('File');
			
			const file = await File.findById(fileId);

			if (!file) {
				throw ApiError.BadRequest(`File ${fileId} not found`);
			}

			const filePath = path.join(file.path);

			if (fs.existsSync(filePath)) {

				const encodedFilename = encodeURIComponent(file.name);
				
				res.setHeader('Content-Disposition', `attachment; filename=${encodedFilename}`);
				res.setHeader('Content-Type', 'application/octet-stream');

				const fileStream = fs.createReadStream(filePath);
				fileStream.pipe(res);

			} else {

				ApiError.BadRequest(`File ${fileId} not found`);

			}

		} catch (error) {
			
			next(error);

		}

	}

}