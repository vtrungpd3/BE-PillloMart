const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const middleware = require('./utils/middleware');
const ConnectDB = require('./config/db');

const initAppRoute = require('./routers');

app.get('/', (req, res) => res.send('Server up and running'));

ConnectDB();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(middleware.requestLogger);

initAppRoute(app);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
