'use strict';

const view = (() => {
	class View {
		constructor(templateLoader) {
			this.templatesPath = '../../html-templates/';
			this.templateLoader = templateLoader;
		}

		header(selectorId, data) {
			this.templateLoader.load(selectorId, this.templatesPath + 'common/' + 'header.html', data);
		}

		footer(selectorId, data) {
			this.templateLoader.load(selectorId, this.templatesPath + 'common/' + 'footer.html', data);
		}

		home(selectorId, data) {
			this.templateLoader.load(selectorId, this.templatesPath + 'home.html', data);
		}
	}

	const viewObj = new View(templateLoader);
	return viewObj;
})();
