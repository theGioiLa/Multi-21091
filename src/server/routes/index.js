const { Router } = require('express')
const path = require('path')
const api = require('./api')
const upload = require('./upload')

const router = new Router()

router.use((req, res, next) => {
    res.responseAPI = function (result) {
        if (result && typeof result.then === 'function') {
            result
                .then(data => res.json({ success: true, data }))
                .catch(e => {
                    console.error('[api][responseAPI] err:', req.method, req.originalUrl, e)
                    const error = {
                        code: e.code,
                        message: e.message,
                    }
                    res.status(400).json({ success: false, error })
                })
        } else if (result instanceof Error) {
            console.error('[api][responseAPI] err:', req.method, req.originalUrl, result)
            const error = {
                code: result.code,
                message: result.message,
            }
            res.status(400).json({ success: false, error })
        } else {
            res.json({ success: true, data: result })
        }
    }
    next()
})

router.use('/api', api)
router.use('/upload', upload)

router.get(['/online', '/online/*'], (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../public/UI/index.html'))
})

module.exports = router
