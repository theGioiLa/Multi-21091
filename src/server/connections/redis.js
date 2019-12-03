const Redis = require('ioredis')
const redisConf = require('../config').redis

const redisConnection = new Redis(redisConf.default)

redisConnection.on('connect', () => console.info('[redisConnectionConnected]'));
redisConnection.on('reconnecting', () => console.warn('[redisConnectionReconnecting]'));
redisConnection.on('error', err => console.error('[redisConnectionError]', err.message));

module.exports = redisConnection
