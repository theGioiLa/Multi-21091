const { Router } = require('express')
const path = require('path')

const { Account } = require('../models')
const jwt = require('../jwt')

const router = new Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await Account.getAccountByEmail(email);
        if (!account) throw new Error('Invalid account');
        if (password !== account.secret && !account.checkPassword(password)) throw new Error('Invalid password');

        const { id, canonicalID, name, username, status, group } = account;
        const userInfo = { id, username, email, canonicalID, name, status, group };
        const token = jwt.getAuthToken(userInfo);

        res.cookie(COOKIES.ACCESS_TOKEN, token, { maxAge: 30 * 24 * 3600 * 1000, path: '/ds' });
        res.cookie(COOKIES.ACCOUNT, JSON.stringify(userInfo), { maxAge: 30 * 24 * 3600 * 1000, path: '/ds' });

        res.responseAPI({ userInfo, token });
    } catch (error) {
        Object.keys(req.cookies).forEach(cookie => {
            res.clearCookie(cookie);
        });

        res.responseAPI(error);
    }
});

export default router;
