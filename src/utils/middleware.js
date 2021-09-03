const logger = require('./logger');

const requestLogger = (req, _, next) => {
    logger.info('Method:', req.method);
    logger.info('Path:', req.path);
    logger.info('Body:', req.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (req, _, next) => {
    req.status(404).send({ error: 'unknown endpoint' });
    next();
};

const errorHandler = (error, _, res, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        });
    }

    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'token expired'
        });
    }

    next();
};



module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};