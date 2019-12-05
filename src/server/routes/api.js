const { Router } = require('express')
const utils = require('../utils')
const path = require('path')
const { storage } = require('../models')

const router = new Router()

router.get('/list', async (req, res) => {
    const { type } = req.query
    let data = await storage.getAll(type)
    let videos = data.videos.map(video => {
        return {
            title: video.title,
            description: `Mimetype: ${video.mimetype}, Size: ${video.size}`
        }
    })

    let audios = data.audios.map(audio => {
        return {
            title: audio.title,
            description: `Mimetype: ${audio.mimetype}, Size: ${audio.size}`
        }
    })
    res.responseAPI(Promise.resolve({ videos, audios }))
})

router.get('/stream/:streamKey', async (req, res) => {
    try {
        const { type } = req.query
        let streamKey = decodeURI(req.params.streamKey)
        let ext = path.extname(streamKey)
        let resource = await storage.get(streamKey, ext)
        if (resource) {
            let hostname = req.hostname == process.env.HOST ? `${req.hostname}:${process.env.PORT}` : req.hostname
            let url = `${req.protocol}://${hostname}${req.baseUrl}`
            if (type == 'mv') {
                let encodedPath = utils.encrypt(resource.transcodePath)
                url += `/mv/${encodedPath}/index.m3u8`
            } else if (type == 'audio') {
                let encodedPath = utils.encrypt(resource.path)
                url += `/audio/${encodedPath}`
            }
            return res.responseAPI(Promise.resolve({ url, mimetype: resource.mimetype }))
        }

        throw new Error('Not found')
    } catch (err) {
        res.responseAPI(err)
    }
})

router.get('/audio/:encodedPath', (req, res) => {
    const path2File = utils.decrypt(req.params.encodedPath)
    res.sendFile(path2File)
})

router.get('/mv/:encodedHlsURL/:segment', (req, res) => {
    const { encodedHlsURL, segment } = req.params
    let hlsPath = utils.decrypt(encodedHlsURL)
    let segmentPath = path.join(hlsPath, segment)
    res.sendFile(segmentPath, err => {
        if (err) console.error(err.message)
    })
})

module.exports = router
