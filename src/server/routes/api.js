const { Router } = require('express')
const path = require('path')

const router = new Router()

router.get('/payload', async (req, res) => {
    console.log(req.query)
})

router.get('/metadata/', async (req, res) => {
    console.log(req.query)
})

router.get('/list', async (req, res) => {
    console.log(req.query)
})

module.exports = router
