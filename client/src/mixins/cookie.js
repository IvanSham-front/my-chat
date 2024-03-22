export const cookie = {
	get(cookieName) {
		const cookies = document.cookie;
		let result = cookies.split(cookieName + '=')[1];
		if (result) {
			result = result.split(';')[0];
		} else {
			result = '';
		}
		return result;
	},

	set(cookieName, value) {
		document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(value)}`;
	},

	remove(cookieName) {
		document.cookie = cookieName + '= ; max-age=0';
	}
};