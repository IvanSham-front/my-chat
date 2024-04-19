const jwt = require('jsonwebtoken');
const { mongoose } = require('mongoose');

const Token = mongoose.model('Token', require('../models/Token') );

class TokenService {

	generateTokens(paylod) {

		const accesToken = jwt.sign(paylod, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '2h'
		});

		const refreshToken = jwt.sign(paylod, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '30d'
		});

		return {

			accesToken,
			refreshToken

		}

	}

	async saveToken ( userId, refreshToken ) {

		let token = await Token.findOne({ userId });

		if (token) {

			token.refreshToken = refreshToken;

		} else {

			token = await Token.create({ userId, refreshToken });
		}

		await token.save();
		return token;

	}
	

	async removeToken ( refreshToken ) {

		const token = await Token.deleteOne({ refreshToken });

		return token;

	}

	validateRefreshToken ( token ) {

		try {

			const accountData = jwt.verify( token, process.env.JWT_REFRESH_SECRET );
			return accountData;

		} catch {

			return null;

		}

	}

	validateAccessToken ( token ) {

		try {

			const accountData = jwt.verify( token, process.env.JWT_ACCESS_SECRET );
			return accountData;

		} catch {

			return null;
			
		}

	}

	async findToken( refreshToken ) {
    
	    const tokenData = await Token.findOne({ refreshToken });
    
	    return tokenData;
    }

};

module.exports = new TokenService();