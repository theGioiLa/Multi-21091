const { redis } = require('../connections')

function Storage() {
    this.redis = redis
    this.prefix = 'storage'
}

Storage.prototype.get = function (key) {
    let _key = this.keygen(key)
    return this.redis.get(_key)
}

Storage.prototype.set = function (key, data) {
    let _key = this.keygen(key)
    return this.redis.set(_key, data)
}

Storage.prototype.keygen = function (key) {
    return `${this.prefix}:${key}`
}

Storage.prototype.del = function (key) {
    let _key = this.keygen(key)
    return this.redis.del(_key)
}

const storage = new Storage()
module.exports = storage