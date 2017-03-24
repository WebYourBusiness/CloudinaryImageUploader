'use strict';

class Data {
	constructor() {
		this.requester = (() => {
			class Requester {

				_sendAjax(method, url, options) {
					options = options || {};

					const headers = options.headers || {},
						data = options.data || undefined;

					const promise = new Promise((resolve, reject) => {
						$.ajax(url, {
							method,
							contentType: 'application/json',
							data: JSON.stringify(data),
							headers,
							success: function (response) {
								resolve(response);
							},
							error: function (err) {
								reject(err);
							}
						});
					});

					return promise;
				}

				get(url, options) {
					return this._sendAjax('GET', url, options);
				}

				post(url, options) {
					return this._sendAjax('POST', url, options);
				}

				put(url, options) {
					return this._sendAjax('PUT', url, options);
				}
			}

			const req = new Requester();

			return req;
		})()
	}
	getData() {
		return this.requester.get('/api/data');
	}
	getPosts() {
		return this.requester.get('/api/posts');
	}
	getEvents() {
		return this.requester.get('/api/events');
	}
	getArticles() {
		return this.requester.get('/api/shop');
	}
}
