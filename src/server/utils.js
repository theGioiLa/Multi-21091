const crypto = require('crypto')

const algorithm = 'aes-128-cbc'
const password = 'onlineaudiomv'

const mvExts = ['.mp4', '.m4a']
const audioExts = ['.mp3']

function getType(exts) {
    if (mvExts.includes(exts)) return 'mv'
    if (audioExts.includes(exts)) return 'audio'
    return 'unknown'
}

function encrypt(msg) {
    let cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(msg, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}

function decrypt(code) {
    let decipher = crypto.createDecipher(algorithm, password)
    let dec = decipher.update(code, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
}

module.exports = {
    getType, encrypt, decrypt
}
