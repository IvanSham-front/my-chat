
const bcrypt = require('bcrypt');
const UserDto = require('../dto/user-dto');
const TokenService = require('./token-service');

class AccountServices {

	constructor(req) {

		this.req = req

	}
	async registration( { login, password } ) {

		const Account = this.req.db.model('Account')

		const existAccount = await Account.findOne( { login } );

		if (existAccount) {
			return null;
		}
		
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);

		const user = await Account.create({ login, password: hashPassword });
		const userDto = new UserDto(user);

		const tokenService = new TokenService(this.req);
		const tokens = tokenService.generateToken( {...userDto} );
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto
		}

	}

};

module.exports = AccountServices;