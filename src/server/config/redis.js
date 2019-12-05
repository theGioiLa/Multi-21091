function retryStrategy(times) {
    console.warn('[retryStrategy] times = ', times)
    return 3000;
}

/**
 * Config redis database
 */
module.exports = {
    localhost: {
        default: {
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT || 6379,
            password: process.env.REDIS_PASSWORD || '',
            db: 0,
            retryStrategy,
        },
        local: {
            host: 'localhost',
            port: 6379,
            password: '',
            db: 0,
            retryStrategy,
        },
    },
};
