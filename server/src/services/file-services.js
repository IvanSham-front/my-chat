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

	ensureDirExists = (dir) => {

		if (!fs.existsSync(dir)) {

			fs.mkdirSync(dir, { recursive: true });

			console.log(`Created directory: ${dir}`);

		}

	};


	generateUniqueFileName = (savePath) => {

		let copyIndex = 1;
		let newPath = savePath;

		while (fs.existsSync(newPath)) {

			const { dir, name, ext } = path.parse(savePath);

			copyIndex++;

			newPath = path.join(dir, `${name}_copy${copyIndex}${ext}`);

		}

		return newPath;
	};

}

module.exports = new FileServices();