'use strict';
const data = (() => {
	class Data {
		constructor(requester) {
			this.requester = requester;
		}

		getCloudinaryParams() {
			return this.requester.get('../../cloudinary-image-store.json');
		}

		postImage(url, data) {
			const options = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Requested-With': 'XMLHttpRequest'
				},
				data: data
			}
			return this.requester.post(url, options);
		}

		postData(url, data) {
			const options = {
				data: data
			}
			return this.requester.post(url, options);
		}
	}

	const dataObj = new Data(ajaxRequester);
	return dataObj;
})();
