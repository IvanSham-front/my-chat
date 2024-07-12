const mongoose = require('mongoose');
const ApiError = require('../exceptions/api-error');
const File = mongoose.model('File', require('../models/File'));

const path = require('path');
const fs = require('fs');

class FileServices {

	async uploadFile(file, ownerId) {

		try {

			const fileType = this.getFileType( file.mimetype );

			const dirPath = path.join(
				process.env.UPLOAD_DIR,
				ownerId,
				fileType
			);

			this.ensureDirExists(dirPath);

			let savePath = path.join(dirPath, file.name);
			
			if (fs.existsSync(savePath)) {
				savePath = this.generateUniqueFileName(savePath);
			}

			file.mv(savePath, (err) => {
		
				if (err) {

					throw ApiError.BadRequest( 'Error with upload file' );
				}

			});

			const fileDb = await File.create({
				name: file.name,
				size: file.size,
				ownerId,
				mimeType: file.mimetype,
				type: fileType,
				path: savePath,
			});

			return fileDb;
			
		} catch (error) {

			console.error(error);
			
			throw ApiError.BadRequest( 'Error with upload file' );

		}

	}

	getFileType (type) {
		
		if (type.includes('image')) {
			return 'image';
		} else if (type.includes('video')) {
			return 'video';
		} else if ( type.includes('audio') ) {
			return 'audio';
		} else {
			return 'other';
		}

	}

	ensureDirExists (dir) {

		if (!fs.existsSync(dir)) {

			fs.mkdirSync(dir, { recursive: true });

			console.log(`Created directory: ${dir}`);

		}

	};

	generateUniqueFileName (savePath) {

		let copyIndex = 1;
		let newPath = savePath;

		while (fs.existsSync(newPath)) {

			const { dir, name, ext } = path.parse(savePath);

			copyIndex++;

			newPath = path.join(dir, `${name}_copy${copyIndex}${ext}`);

		}

		return newPath;

	};

	async sendFileStream  (fileId, range) {

		const file = await File.findById(fileId);

		if (!file) {
			throw ApiError.BadRequest(`File ${fileId} not found`);
		}

		const filePath = path.join(file.path);

		try {

			if (file.type === 'video' && range) {

				const parts = range.replace(/bytes=/, "").split('-');
				const start = parseInt(parts[0], 10);
				const end = parts[i] ? parseInt(parts[1], 10) : file.size - 1;

				const fileStream = fs.createReadStream(filePath, { start, end });

				const head = {
					'Content-Range': `bytes ${start}-${end}/${file.size}`,
					'Accept-Ranges': 'bytes',
					'Content-Length': chunksize,
					'Content-Type': file.mimeType,
				}

				return {
					fileStream,
					head
				}


			} else {

				const head = {
					'Content-Length': file.size,
					'Content-Type': file.mimeType,
				};

				const fileStream = fs.createReadStream(filePath)

				return {
					fileStream,
					head
				}

			}

		} catch(error) {

			console.error(error);
			
			throw ApiError.BadRequest( 'Error with stream file' );

		}

	}

}

module.exports = new FileServices();