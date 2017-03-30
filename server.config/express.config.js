module.exports = (express, app) => {
	const path = require('path');
	const bodyParser = require('body-parser');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	const staticFolderName = '../static';
	app.use('/', express.static(path.join(__dirname, staticFolderName)));
}
