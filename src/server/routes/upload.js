const { Router } = require('express')
const Busboy = require('busboy')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const utils = require('../utils')
const { storage } = require('../models')
const ffmpeg = require('fluent-ffmpeg')
const router = new Router()
const uploadDir = path.join(__dirname, '../storage')

router.post('/', (req, res) => {
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', function (fieldName, file, filename, encoding, mimetype) {
        let ext = path.extname(filename)
        let type = utils.getType(ext)
        try {
            let destPath = path.join(uploadDir, filename)
            if (type == 'audio') {
                let dest = fs.createWriteStream(destPath)
                file.pipe(dest)
                dest.on('finish', async () => {
                    let { base, dir, ext } = path.parse(dest.path)
                    let key = base
                    let info = {
                        title: base,
                        mimetype,
                        size: dest.bytesWritten,
                        path: dest.path,
                    }
                    await storage.set(key, ext, JSON.stringify(info))
                    res.responseAPI(Promise.resolve(''))
                })

            } else if (type == 'mv') {
                let dir = destPath
                mkdirp.sync(dir)
                destPath = path.join(dir, filename)
                let dest = fs.createWriteStream(destPath)
                file.pipe(dest)

                dest.on('finish', () => {
                    let { base, dir, ext } = path.parse(dest.path)
                    let transcodePath = path.join(dir, 'hls')
                    mkdirp.sync(transcodePath)
                    transcode(dest.path, transcodePath, async () => {
                        let key = base
                        let info = {
                            title: base,
                            originalPath: dest.path,
                            transcodePath,
                            mimetype,
                            size: dest.bytesWritten,
                        }
                        await storage.set(key, ext, JSON.stringify(info))
                        res.responseAPI(Promise.resolve(''))
                    })
                })
            }
        } catch (err) {
            res.responseAPI(err)
        }
    })

    req.pipe(busboy)
})

function transcode(src, dest, done) {
    console.log('Source: ', src)
    console.log('Dest: ', dest)

    const command = ffmpeg(src)
        .videoCodec('libx264')
        .audioCodec('aac')
        .audioBitrate(128)
        .videoBitrate('800k')
        .outputOptions([
            '-hls_time 2',
            '-r 25',
            '-g 50',
            '-hls_playlist_type vod'
        ])
        .output(path.join(dest, 'index.m3u8'))
        .on('progress', function (progress) {
            // console.log('Processing: ' + progress.percent + '% done')
        })
        .on('end', function (err, stdout, stderr) {
            done()
            // console.log('Finished processing!' /*, err, stdout, stderr*/)
        })
        .run()
}

module.exports = router
