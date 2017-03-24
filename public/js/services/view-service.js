'use strict';

const templatesPath = './html-templates/';

class View {
	constructor(templateLoader) {
		this.templateLoader = (() => {
			class TemplateLoader {
				_compile(templateUrl) {
					return new Promise((resolve, reject) => {
						axios.get(templateUrl)
							.then((htmlTemplate) => {
								let compiledTemplate = Handlebars.compile(htmlTemplate.data);
								resolve(compiledTemplate);
							});
					});
				}
				load(selectorId, templateUrl, data) {
					let selectedItem = document.getElementById(selectorId);
					data = data || Object;
					return this._compile(templateUrl).then((compiledTemplate) => {
						selectedItem.innerHTML = compiledTemplate(data);
					});
				}
			}

			const tempLoader = new TemplateLoader();

			return tempLoader;
		})();
	}

	home(selectorId, data) {
		this.templateLoader.load(selectorId, templatesPath + 'home.html', data);
	}
}
