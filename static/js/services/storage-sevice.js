'use strict';

let cloudinaryStore = {
	uploadImage: (file) => {
		return data.getCloudinaryParams()
			.then((params) => {
				const CLOUDINARY_URL = params.data.CLOUDINARY_URL;
				const CLOUDINARY_UPLOAD_PRESET = params.data.CLOUDINARY_UPLOAD_PRESET;

				const formData = new FormData();

				formData.append('file', file);
				formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

				return {
					CLOUDINARY_URL: CLOUDINARY_URL,
					formData: formData
				}
			})
			.then((dataObj) => {
				return data.postImage(dataObj.CLOUDINARY_URL, dataObj.formData);
			})
			.then((dataObj) => {
				return dataObj.data;
			})
			.catch((err) => {
				console.log(err);
			});;
	}
}

let localStore = {
	setLocal: (name, value) => {
		localStorage.setItem(name, value);
		return this;
	},
	getLocal: (name) => {
		return localStorage.getItem(name);
	}
}

let cookieStore = {
	setCookie: (name, value, minutes) => {
		let date = new Date();

		date.setTime(date.getTime() + (minutes * 60 * 1000));

		let expires = "; expires=" + date.toGMTString();

		document.cookie = name + "=" + value + expires + "; path=/";
	},

	getCookieByName: (name) => {
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
