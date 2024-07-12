
const bcrypt = require('bcrypt');
const AccountDto = require('../dto/account-dto');
const TokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');
const { mongoose } = require('mongoose');

const User = mongoose.model('User', require('../models/User'));
const Account = mongoose.model('Account', require('../models/Account'));
const Token = mongoose.model('Token', require('../models/Token'));

class AccountServices {

	constructor(req) {

		this.req = req

	}
	
	async registration( { login, password } ) {

		const existAccount = await Account.findOne( { login } );

		if (existAccount) {

			throw ApiError.BadRequest('A user with this login already exists');
			
		}
		
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);

		const account = await Account.create( { login, password: hashPassword } );
		const user = await User.create( { login } );
		const accountDto = new AccountDto(account);
		
		const tokens = TokenService.generateTokens( { ...accountDto } );
		await TokenService.saveToken(accountDto.id, tokens.refreshToken);

		return {
			...tokens,
			user
		}
	}

	async getUserByAccount ( account ) {

		if ( !account.login ) {

			const accountData = await Account.findById( account.id );

			account.login = accountData.login;

		}

		const user = await User.findOne( { login: account.login } );

		if (!user) {

			throw ApiError.BadRequest('Auth user not not found');

		}

		return user;

	} 

	async login( { login, password } ) {

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

		const tokens = TokenService.generateTokens( { ...accountDto } );
		await TokenService.saveToken(accountDto.id, tokens.refreshToken);

		return {
			...tokens,
			user
		}

	}

	async logout ( refreshToken ) {

		const token = await TokenService.removeToken(refreshToken);
        return token;

	}

	async refresh ( refreshToken ) {

		if ( !refreshToken ) {

			throw ApiError.UnauthorizedError();

		}

		const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {

            throw ApiError.UnauthorizedError();

        }

		const account = await Account.findById( userData.id );
		const accountDto = new AccountDto(account);

        const tokens = TokenService.generateTokens({ ...accountDto });

		await TokenService.saveToken(accountDto.id, tokens.refreshToken);
        
		return { ...tokens }

	}

	async remove ( userId ) {

		const user = await User.findById(userId);

		if (!user) {

			throw ApiError.BadRequest(`User [ ${ userId } ] not found.`)

		}

		const account = await Account.findOne( { login: user.login } );

		if (!account) {

			throw ApiError.BadRequest(`Error when deleting user`);

		}
		
		const token = await Token.findOne( { userId: account.id } );

		if ( !user || !token || !account ) {

			throw ApiError.BadRequest('Error when deleting user');

		}

		await user.deleteOne();

		if (token) {

			await token.deleteOne();

		}
		
		await Account.findByIdAndDelete(account.id);

		return user;

	}

};

module.exports = new AccountServices();