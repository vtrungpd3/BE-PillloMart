const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const middleware = require('./utils/middleware');
const ConnectDB = require('./config/db');

const initAppRoute = require('./routers');
app.get('/', (req, res) => res.send('Server up and running'));

ConnectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(express.static(path.join(__dirname, '../uploads')));
console.log(path.join(__dirname, '../uploads'));
initAppRoute(app);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;