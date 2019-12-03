const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const cors = require('cors')
const routes = require('./routes')
// const passport = require('./passport')

const app = express();


app.use(compression());
app.use(cors());
app.use(express.static(path.join(__dirname, '../../public'), { maxAge: 7 * 24 * 3600 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(passport.initialize());

app.use(routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const FAVICON_REGEX = /\/(favicon|(apple-)?touch-icon(-i(phone|pad))?(-\d{2,}x\d{2,})?(-precomposed)?)\.(jpe?g|png|ico|gif)$/i
    if (FAVICON_REGEX.test(req.url)) {
        res.statusCode = 204;
        return res.end();
    }
    const err = new Error('Not Found: ' + req.method + ' - ' + req.originalUrl);
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    // Render the error page
    if (err.status != 404) console.error('[ErrorHandler] err', err);
    res.status(err.status || 500).end(err.message);
});

module.exports = app
