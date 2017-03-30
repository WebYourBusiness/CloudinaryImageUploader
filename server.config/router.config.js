module.exports = (express, app, mongo) => {
	const apiRouter = new express.Router();
	const db = mongo.db;
	const mongojs = mongo.api;

	app.use('/api', apiRouter);

	apiRouter.get('/blogs', (req, res, next) => {
		db['events']
			.find({}, (err, news) => {
				if (err) {
					res.send(err);
				}
				res.json(news);
			})
	});

	apiRouter.post('/blog', (req, res, next) => {
		const newPost = req.body;

		db['events']
			.save(newPost, (err, newPost) => {
				if (err) {
					res.send(err);
					return;
				}
				res.json(newPost);
			})
	});

	apiRouter.get('/blogs/:id', (req, res, next) => {
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