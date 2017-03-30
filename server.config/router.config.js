module.exports = (express, app, mongo) => {
	const apiRouter = new express.Router();
	const db = mongo.db;
	const mongojs = mongo.api;

	app.use('/api', apiRouter);

	apiRouter.get('/images', (req, res, next) => {
		db['events']
			.find({}, (err, news) => {
				if (err) {
					res.send(err);
				}
				res.json(news);
			})
	});

	apiRouter.post('/image/events', (req, res, next) => {
		const newPost = req.body;
		console.log(newPost);

		db['events']
			.save(newPost, (err, newPost) => {
				if (err) {
					res.send(err);
					return;
				}
				res.json(newPost);
			})
	});

	apiRouter.post('/image/interiors', (req, res, next) => {
		const newPost = req.body;
		console.log(newPost);

		db['interiors']
			.save(newPost, (err, newPost) => {
				if (err) {
					res.send(err);
					return;
				}
				res.json(newPost);
			})
	});

	apiRouter.post('/image/accessories', (req, res, next) => {
		const newPost = req.body;
		console.log(newPost);

		db['accessories']
			.save(newPost, (err, newPost) => {
				if (err) {
					res.send(err);
					return;
				}
				res.json(newPost);
			})
	});

	apiRouter.post('/image/stained-glasses', (req, res, next) => {
		const newPost = req.body;
		console.log(newPost);

		db['stained-glasses']
			.save(newPost, (err, newPost) => {
				if (err) {
					res.send(err);
					return;
				}
				res.json(newPost);
			})
	});

	apiRouter.post('/user', (req, res, next) => {
		const newPost = req.body;

		db['users']
			.save(newPost, (err, newPost) => {
				if (err) {
					res.send(err);
					return;
				}
				res.json(newPost);
			})
	});

	apiRouter.get('/image/:id', (req, res, next) => {
		db['events']
			.find({ _id: mongojs.ObjectId(req.params.id) }, (err, news) => {
				if (err) {
					res.send(err);
				}
				res.json(news);
			})
	});

	apiRouter.put('/comment/:id', function (req, res, next) {
		let comment = req.body.comment;
		let updatedImage = { $push: { comments: comment } };

		db['events'].update({ _id: mongojs.ObjectId(req.params.id) }, updatedImage, {},
			(err, comment) => {
				if (err) {
					res.send(err);
				}
				res.json(comment);
			})
	});
}