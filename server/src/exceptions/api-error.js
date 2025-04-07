const logger = require("../logger");

class ApiError extends Error {
	constructor(status, message) {
		super(message);

		this.status = status;

	}

	static UnauthorizedError() {
		
		const code = 401;
		const message = 'User are not authorized';

		logger.warn({
			code,
			message
		});

		return new ApiError(code, message);
	}

	static BadRequest(message) {

		logger.warn({
			code: 400,
			message
		});

		return new ApiError(400, message);
	}
	
}

module.exports = ApiError;