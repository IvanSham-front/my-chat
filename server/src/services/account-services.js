
const bcrypt = require('bcrypt');
const AccountDto = require('../dto/account-dto');
const TokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class AccountServices {

	constructor(req) {

		this.req = req

	}
	
	async registration( { login, password } ) {

		const Account = this.req.db.model('Account');
		const User = this.req.db.model('User');

		const existAccount = await Account.findOne( { login } );

		if (existAccount) {

			throw ApiError.BadRequest('A user with this login already exists');
			
		}
		
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);

		const account = await Account.create( { login, password: hashPassword } );
		const user = await User.create( { login } );
		const accountDto = new AccountDto(account);

		const tokenService = new TokenService(this.req);
		const tokens = tokenService.generateTokens( { ...accountDto } );
		await tokenService.saveToken(accountDto.id, tokens.refreshToken);

		return {
			...tokens,
			user
		}
	}

	async login( { login, password } ) {

		const Account = this.req.db.model('Account');
		const User = this.req.db.model('User');

		const account = await Account.findOne( { login } );

		const user = await User.findOne( { login } );

		if (!account || !user) {

			throw ApiError.BadRequest('A user with this login not found');

		}

		const isPassEquals = await bcrypt.compare(password, account.password);

		if (!isPassEquals) {

			throw ApiError.BadRequest('Incorrect password');

		}

		const accountDto = new AccountDto(account);

		const tokenService = new TokenService(this.req);
		const tokens = tokenService.generateTokens( { ...accountDto } );
		await tokenService.saveToken(accountDto.id, tokens.refreshToken);

		return {
			...tokens,
			user
		}

	}

	async logout ( refreshToken ) {

		const tokenService = new TokenService(this.req);
		const token = await tokenService.removeToken(refreshToken);
        return token;

	}

	async refresh ( refreshToken ) {

		if ( !refreshToken ) {

			throw ApiError.UnauthorizedError();

		}

		const tokenService = new TokenService(this.req);
		const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {

            throw ApiError.UnauthorizedError();

        }

		const Account = this.req.db.model( 'Account' );
		const account = await Account.findById( userData.id );
		const accountDto = new AccountDto(account);

        const tokens = tokenService.generateTokens({ ...accountDto });

		await tokenService.saveToken(accountDto.id, tokens.refreshToken);
        
		return { ...tokens }

	}

};

module.exports = AccountServices;