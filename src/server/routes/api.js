const { Router } = require('express')
const fs = require('fs')
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

    res.responseAPI(data)
})

router.get('/hls/vod/:streamKey', async (req, res) => {
    const {streamKey} = req.params
    try {
        let _streamKey = streamKey.replace(' ', '_')
        let ext = path.extname(_streamKey)
        let resource = await storage.get(_streamKey, ext)
        if (resource) {
            let hlsPath = path.join(resource.transcodePath, 'index.m3u8')
            let data = fs.readFileSync(hlsPath)
            return res.responseAPI(Promise.resolve(data))
        }

        throw new Error('Not found')
    } catch (err) {
        res.responseAPI(err)
    }
})

module.exports = router
