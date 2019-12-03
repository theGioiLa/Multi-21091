const { Router } = require('express')
const path = require('path')
const { storage } = require('../models')

const router = new Router()

router.get('/payload', async (req, res) => {
    console.log(req.query)
})

router.get('/metadata/', async (req, res) => {
    console.log(req.query)
})

router.get('/list', (req, res) => {
    const { type = 'all' } = req.query
    let data
    if (type == 'all') data = storage.getAll()
    if (type == 'mv') data = storage.getAudios()
    if (type == 'audio') data = storage.getMVs()

    res.resonseAPI(data)
})

module.exports = router
