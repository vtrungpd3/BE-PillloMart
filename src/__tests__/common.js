/*global beforeAll afterAll test expect*/
/*eslint no-undef: "error"*/

const supertest = require('supertest');
const { start } = require('../server');
const config = require('../config');
const MongoService = require('../services/mongo');

const server = start(config.app, config.api);
const api = supertest(server);

let status = 0;

beforeAll(async () => {
    await MongoService.connect(config.database.mongo);
    status = (await MongoService.mongoose.connection.asPromise() || {}).readyState;
});

afterAll( (done) => {
    return MongoService.mongoose.disconnect(done);
});

test('should Connected', async () => {
    expect(status).toBe(1);
});

module.exports = {
    api,
};