export const cookie = {
	get(cookieName: string) {
		const cookies = document.cookie;
		let result = cookies.split(cookieName + '=')[1];
		if (result) {
			result = result.split(';')[0];
		} else {
			result = '';
		}
		return result;
	},

	set(cookieName: string, value: string) {
		document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(value)}`;
	},

	remove(cookieName: string) {
		document.cookie = cookieName + '= ; max-age=0';
	},
};
