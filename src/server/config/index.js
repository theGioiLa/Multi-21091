const redisConfig = require('./redis')
const jwtConfig = require('./jwt')

const NODE_ENV = process.env.NODE_ENV || 'localhost';
if (['localhost', 'development', 'production'].indexOf(NODE_ENV) < 0) throw new Error('NODE_ENV env invalid!');

const redis = redisConfig[NODE_ENV];
const jwt = jwtConfig[NODE_ENV];

module.exports =  {
    redis,
    jwt,
}
