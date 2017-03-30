module.exports = (() => {
	const mongojs = require('mongojs');
	const connectionString = require('../mongodb-text-store.json').mongodbConnection;
	const collections = ['users', 'events', 'accessories', 'stained-glasses', 'interiors'];

	const db = mongojs(connectionString, collections);

	const mongo = {
		api: mongojs,
		db: db
	}

	return mongo;
})();