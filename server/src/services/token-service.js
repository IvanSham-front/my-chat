const jwt = require('jsonwebtoken');

class TokenService {
	
	constructor (req) {
		this.req = req;
	}

	generateTokens(paylod) {

		const accesToken = jwt.sign(paylod, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30m'
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

		const Token = this.req.db.model('Token')

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

		const Token = this.req.db.model('Token')

		const token = await Token.deleteOne({ refreshToken });

		return token;

	}

	static  validateRefreshToken ( token ) {

		try {

			const accountData = jwt.verify( token, process.env.JWT_REFRESH_SECRET );
			return accountData;

		} catch {

			return null;

		}

	}

	static validateAccessToken ( token ) {

		try {

			const accountData = jwt.verify( token, process.env.JWT_ACCESS_SECRET );
			return accountData;

		} catch {

			return null;
			
		}

	}

	async findToken( refreshToken ) {

		const Token = this.req.db.model('Token');
    
	    const tokenData = await Token.findOne({ refreshToken });
    
	    return tokenData;
    }

};

module.exports = TokenService;