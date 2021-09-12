const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const initAppRoute = require('./routers');

const applyDefaultMiddleware = (server, appConfig) => {
    server.use(cors());
    server.use(express.json());
    server.use(bodyParser.json());
    server.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    if (appConfig.morganEnable) {
        server.use(morgan('dev'));
    }
};

const start = (appConfig, apiConfig) => {
    const { port, authHeaderKey } = appConfig;
    const apiServer = express();
    
    apiServer.get('/', (request, response) => {
        response.send('<h1>Hello World!</h1>');
    });
    
    applyDefaultMiddleware(apiServer, appConfig);
    initAppRoute(apiServer, apiConfig.prefix, authHeaderKey);

    apiServer.listen(port, () => {
        console.log('\x1b[36m%s\x1b[0m', '[Server]', '\x1b[0m', `Running on port ${port}`);
    });
};

module.exports = {
    start
};