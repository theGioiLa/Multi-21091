const jwt = require('./jwt')
const { Account } = require('./models')

module.exports = function (isRequired = true) {
    return async function (req, res, next) {
        try {
            let token;
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                token = req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                token = req.query.token;
            }
            if (!token) throw new Error('Token invalid');
            const data = jwt.verifyAuthToken(token);
            const account = await Account.getAccountById(data.id);
            if (!account || !account.isAdmin()) throw new Error('Permission denied.');
            req._user = account;
            return next();
        } catch (err) {
            if (!isRequired) return next();
            console.warn('[middlewares][auth] originalUrl:', req.method, req.originalUrl);
            return res.responseAPI(err);
        }
    }
}
