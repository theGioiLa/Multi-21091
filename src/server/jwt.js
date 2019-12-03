const jwt = require('jsonwebtoken')
const jwtConfig = require('./config').jwt

module.exports = {
    getAuthToken: function (payload) {
        return jwt.sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
    },
    verifyAuthToken: function (token) {
        return jwt.verify(token, jwtConfig.secretKey);
    }
}