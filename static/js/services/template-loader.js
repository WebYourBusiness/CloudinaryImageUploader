'use strict';

const templateLoader = (() => {
	class TemplateLoader {
		_compile(templateUrl) {
			return new Promise((resolve, reject) => {
				axios.get(templateUrl)
					.then((htmlTemplate) => {
						let compiledTemplate = Handlebars.compile(htmlTemplate.data);
						resolve(compiledTemplate);
					})
					.catch((err) => {
						reject(err);
					});
			}
			);
		}

		load(selector, templateUrl, data) {
			let selectedItem = document.querySelector(selector);
			data = data || Object;

			this._compile(templateUrl)
				.then((compiledTemplate) => {
					return selectedItem.innerHTML = (compiledTemplate(data));
				})
				.catch((err) => {
					reject(err);
				});
		}
	}

	const tempLoader = new TemplateLoader();

	return tempLoader;
})();
