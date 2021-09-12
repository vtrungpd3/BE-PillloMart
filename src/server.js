const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const initAppRoute = require('./routers');

const applyDefaultMiddleware = (server, appConfig) => {
    server.use(cors());
    server.use(express.json());
    server.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    if (appConfig.morganEnable) {
        server.use(morgan('dev'));
    }
};

const start = (appConfig, apiConfig) => {
    const { port, authHeaderKey } = appConfig;
    const apiServer = express();
    
    applyDefaultMiddleware(apiServer, appConfig);
    initAppRoute(apiServer, apiConfig.prefix, authHeaderKey);

    apiServer.listen(port || 80, () => {
        console.log('\x1b[36m%s\x1b[0m', '[Server]', '\x1b[0m', `Running on port ${port}`);
    });
};

module.exports = {
    start
};