const { redis } = require('../connections')
const utils = reqiure('../utils')

function Storage() {
    this.redis = redis
    this.prefix = 'storage'
}

Storage.prototype.get = function (key) {
    let _key = this.keygen(key)
    return this.redis.get(_key)
}

Storage.prototype.set = function (key, ext, data) {
    let _key = this.keygen(key, ext)
    return this.redis.set(_key, data)
}

Storage.prototype.keygen = function (key, ext) {
    let type = utils.getType(ext)
    return `${this.prefix}:${type}:${key}`
}

Storage.prototype.del = function (key) {
    let _key = this.keygen(key)
    return this.redis.del(_key)
}

Storage.prototype.getAll = async function () {
    let pattern = '*:storage:*'
    let resources = await this.redis.keys(pattern)
    console.log(resources)
    return resources
}

Storage.prototype.getAudios = async function () {
    let pattern = '*:audio:*'
    let resources = await this.redis.keys(pattern)
    console.log(resources)
    return resources
}

Storage.prototype.getMVs = async function () {
    let pattern = '*:mv:*'
    let resources = await this.redis.keys(pattern)
    console.log(resources)
    return resources
}

const storage = new Storage()
module.exports = storage