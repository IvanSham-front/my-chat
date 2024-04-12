const fs = require('fs');
const path = require('path');

const files = {};

fs.readdirSync(path.join(__dirname)).forEach((file) => {
	if (file.endsWith('.js') && file !== 'index.js') {
		try {
			const fileName = path.basename(file, path.extname(file));
			files[fileName] = require('./' + file);
		} catch (err) {
			console.error(`Model ${file} import error!`);
			console.error(err.name, err.message, err.stack);
		}
	}
});

module.exports = files;
