const supertest = require('supertest');
const { start } = require('../server');
const config = require('../config');
const MongoService = require('../services/mongo');

const server = start(config.app, config.api);
const api = supertest(server);

const mongo = async () => (
    await MongoService.connect(config.database.mongo)
);

const configHeader = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ4OTVkNWYwZTEwOGI0NTUwOTM4MTIiLCJjYXJ0SWQiOiI2MTQ4OTVkNWYwZTEwOGI0NTUwOTM4MTQiLCJvcmRlcklkIjoiNjE0ODk1ZDVmMGUxMDhiNDU1MDkzODE2IiwiaWF0IjoxNjMyNDk4NTM5fQ.U8KC7P4qbR4ccMVZsHRnD5tSOxaYAu-cbRQWI5Br5ts',
};

module.exports = {
    api,
    configHeader,
    mongo,
};