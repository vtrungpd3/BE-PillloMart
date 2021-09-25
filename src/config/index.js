const devEnv = require('./devEnv');
const testEnv = require('./testEnv');

let config = process.env.NODE_ENV === 'test' ? testEnv : devEnv;

module.exports = config;