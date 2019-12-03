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
                let dir = path.parse(dest.path).dir
                let transcodePath = path.join(dir, 'hls')
                transcode(dest.path, transcodePath, () => {
                    
                })
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

function transcode(src, dest, done) {
    console.log('Source: ', src)
    console.log('Dest: ', dest)

    const command = ffmpeg(src)
    .audioCodec('aac')
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
        'hls_time 10'
    ])
    .output(dest)
    .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done')
    })
    .on('end', function(err, stdout, stderr) {
        console.log('Finished processing!' /*, err, stdout, stderr*/)
    })
    .run() 
}

module.exports = router