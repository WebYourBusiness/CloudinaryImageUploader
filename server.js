'use strict';

// MongoDB config
const mongojs = require('mongojs');
const connectionString = 'mongodb://Satanaso:1qazxsw2@ds133260.mlab.com:33260/mongocloud';
const collections = ['images-collection'];

const db = mongojs(connectionString, collections);
db.on('error', function (err) {
    console.log('Database error: ' + err)
})

db.on('connect', function () {
    console.log('Database connected...')
})

// EXPRESS config
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');

const app = express();

// body-parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder
const staticFolderName = './public';
app.use('/', express.static(path.join(__dirname, staticFolderName)));

// routes
const apiRouter = new express.Router();

app.use('/api', apiRouter);

apiRouter.get('/images', (req, res, next) => {
    db['images-collection']
        .find({}, (err, images) => {
            if (err) {
                res.send(err);
            }
            res.json(images);
        })
});

apiRouter.post('/image', (req, res, next) => {
    const image = req.body;
    db['images-collection']
        .save(image, (err, image) => {
            if (err) {
                res.send(err);
            }
            res.json(image);
        })
});

// connection on port
const port = 3003
app.listen(port);
console.log(`Server running on port:${port}`);
require('openurl').open(`http://localhost:${port}`);
