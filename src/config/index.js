const development = require('./development');
const test = require('./test');

let config = process.env.NODE_ENV === 'test' ? test : development;

module.exports = config;