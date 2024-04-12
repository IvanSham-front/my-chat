const jwt = require('jsonwebtoken');
const TokenModel = require('../models/Token');


class TokenService {
	
	constructor (req) {
		this.req = req;
	}

	generateToken(paylod) {

		const accesToken = jwt.sign(paylod, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30m'
		});

		const refreshToken = jwt.sign(paylod, process.env.JWT_REFRESH_TOKEN, {
			expiresIn: '30d'
		});

		return {

			accesToken,
			refreshToken

		}

	}

	async saveToken ( userId, refreshToken ) {

		const Token = this.req.db.model('Token')

		const existToken = await Token.findOne({ userId });

		if (existToken) {

			existToken.refreshToken = refreshToken;
			return existToken.save();

		}

		const newToken = await Token.create({userId, refreshToken});

		return newToken;

	}

};

module.exports = TokenService;