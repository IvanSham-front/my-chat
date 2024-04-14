class ApiError extends Error {
	constructor(status, message) {
		super(message);

		this.status = status;

	}

	static UnauthorizedError() {
		return new ApiError(401, 'User are not authorized');
	}

	static BadRequest(message) {

		return new ApiError(400, message);
	}
	
}

module.exports = ApiError;