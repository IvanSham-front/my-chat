export default class CredentialsValidator {
	private login: string;
	private password: string;

	constructor(login: string, password: string) {
		this.login = login;
		this.password = password;
	}

	private validateLogin() {
		if (this.login.length < 3) {
			return { valid: false, error: 'Login must be at least 3 characters long.' };
		}
		if (/[^a-zA-Z0-9_@.-]/.test(this.login)) {
			return { valid: false, error: 'Login can only contain letters and numbers.' };
		}
		return { valid: true, error: '' };
	}

	private validatePassword() {
		if (this.password.length < 8) {
			return { valid: false, error: 'Password must be at least 8 characters long.' };
		}
		if (!/[A-Z]/.test(this.password)) {
			return { valid: false, error: 'Password must contain at least one uppercase letter.' };
		}
		if (!/[a-z]/.test(this.password)) {
			return { valid: false, error: 'Password must contain at least one lowercase letter.' };
		}
		if (!/\d/.test(this.password)) {
			return { valid: false, error: 'Password must contain at least one number.' };
		}
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password)) {
			return { valid: false, error: 'Password must contain at least one special character.' };
		}
		return { valid: true, error: '' };
	}

	validate() {
		const loginValidation = this.validateLogin();
		const passwordValidation = this.validatePassword();

		return {
			login: loginValidation,
			password: passwordValidation
		};
	}
}
