const { Router } = require('express')
const Busboy = require('busboy')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const { storage } = require('../models')
const ffmpeg = require('fluent-ffmpeg')
const router = new Router()
const uploadDir = path.join(__dirname, '../storage')

router.post('/', async (req, res) => {
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', function (fieldName, file, filename, encoding, mimetype) {
        let dir = path.join(uploadDir, filename)
        try {
            mkdirp.sync(dir)
            let destPath = path.join(dir, filename)
            let dest = fs.createWriteStream(destPath)
            file.pipe(dest)

            dest.on('finish', () => {
                let { base, dir } = path.parse(dest.path)
                let transcodePath = path.join(dir, 'hls')
                mkdirp.sync(transcodePath)
                transcode(dest.path, transcodePath, () => {
                    let key = base
                    let info = {
                        originalPath: dest.path,
                        transcodePath
                    }
                    storage.set(key, JSON.stringify(info))
                }, filename)
            })
        } catch (err) {
            res.responseAPI(err)
        }
    })

    busboy.on('finish', function () {
        res.responseAPI(Promise.resolve(''))
    })

    req.pipe(busboy)
})

function transcode(src, dest, done, filename) {
    console.log('Source: ', src)
    console.log('Dest: ', dest)

    const command = ffmpeg(src)
        .audioCodec('libopus')
        .audioBitrate(128)
        .videoBitrate('1000')
        // .outputOptions([
        //     '-codec: copy',
        //     '-hls_time 10',
        //     '-hls_playlist_type vod',
        //     '-hls_base_url http://localhost:8080/',
        //     '-hls_segment_filename ~/%03d.ts'
        // ])
        .outputOptions([
            '-hls_time 10',
          `-hls_segment_filename ${dest}/${filename}_%03d.ts`,
          // '-hls_base_url http://localhost:8080/'
        ])
        .output(path.join(dest, filename+'.m3u8'))
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done')
        })
        .on('end', function (err, stdout, stderr) {
            done()
            console.log('Finished processing!' /*, err, stdout, stderr*/)
        })
        .run()
}

module.exports = router