const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.use((req, res, next) => {
	req.db = require('mongoose').connection;
	next();
});

fs.readdirSync(path.join(__dirname)).forEach((file) => {
	if (file.endsWith('.js') && file !== 'index.js') {
		try {
			const route = require('./' + file);
			const fileName = path.basename(file, path.extname(file));
			router.use('/' + fileName, route);
		} catch (err) {
			console.error(`Route ${file} import error!`);
			console.error(err.name, err.message, err.stack);
		}
	}
	if (file.endsWith('js')) {
	}
});

module.exports = router;
