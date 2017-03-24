'use strict';

let localStorages = {
	setLocal: function (name, value) {
		localStorage.setItem(name, value);
		return this;
	},
	getLocal: function (name) {
		return localStorage.getItem(name);
	}
}

let cookieStorages = {
	setCookie: function (name, value, minutes) {
		let date = new Date();

		date.setTime(date.getTime() + (minutes * 60 * 1000));

		let expires = "; expires=" + date.toGMTString();

		document.cookie = name + "=" + value + expires + "; path=/";
	},

	getCookieByName: function (name) {
		let allCookies = document.cookie.split(";");

		for (let i = 0; i < allCookies.length; i += 1) {
			let cookie = allCookies[i];
			let trailingZeros = 0;

			for (let j = 0; j < cookie.length; j += 1) {
				if (cookie[j] !== " ") {
					break;
				}
			}
			cookie = cookie.substring(j);

			if (cookie.startsWith(name + "=")) {
				return cookie;
			}
		}
	}
}
