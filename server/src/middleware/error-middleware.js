const ApiError = require('../exceptions/api-error');
const logger = require('../logger');

module.exports = function (err, req, res, next) {
	
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}

	logger.err(err)

	return res.status(500).json({
		name: err?.name,
		message: err?.message,
		stack: err?.stack,
	});
};
