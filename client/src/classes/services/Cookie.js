export class Cookie {
	getCookie(cookieName) {
		const cookies = document.cookie;
		let result = cookies.split(cookieName + '=')[1];
		if (result) {
			result = result.split(';')[0];
		} else {
			result = '';
		}
		return result;
	}

	setCookie(cookieName, value) {
		document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(value)}`;
	}

	removeCookie(cookieName) {
		document.cookie = cookieName + '= ; max-age=0';
	}
}