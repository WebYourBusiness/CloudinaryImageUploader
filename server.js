'use strict';

const mongo = require('./server.config/mongo.config');

const express = require('express');

const app = express();

require('./server.config/express.config')(express, app);

require('./server.config/router.config')(express, app, mongo);

const port = process.env.PORT || 3003;

app.listen(port);

console.log(`Server running on port:${port}`);

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    require('openurl').open(`http://localhost:${port}`);
}
