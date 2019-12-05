const { redis } = require('../connections')
const utils = require('../utils')

function Storage() {
    this.redis = redis
    this.prefix = 'storage'
}

Storage.prototype.get = async function (key, ext) {
    let _key = this.keygen(key, ext)
    let data = await this.redis.get(_key)
    return JSON.parse(data)
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

Storage.prototype.getAll = async function (type) {
    let data
    if (type == 'mv') data = await this._getAll('mv')
    else if (type == 'audio') data = await this._getAll('audio')
    else {
        let videos = await this._getAll('mv')
        let audios = await this._getAll('audio')
        data = { videos, audios }
    }

    return data
}

Storage.prototype._getAll = async function (type) {
    let pattern = `*:${type}:*`
    let keys = await this.redis.keys(pattern)
    let data = []
    for (let i = 0; i < keys.length; i++) {
        let info = await this.redis.get(keys[i])
        data.push(JSON.parse(info))
    }

    return data
}

const storage = new Storage()
module.exports = storage
