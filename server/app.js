const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const path = require('path')
const cors = require('cors')

const {log} = require('./utils')
const { secretKey } = require('./config')

const index = require('./routes/index')
const admin = require('./routes/admin')
const weibo = require('./routes/weibo')
const comment = require('./routes/comment')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(bodyParser.json())

app.use(session({
    secret: secretKey,
}))
// app.use(cors())

nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: true,
})

const asset = path.join(__dirname, 'static')
app.use('/static', express.static(asset))

app.use('/', index)
app.use('/admin', admin)
app.use('/weibo', weibo)
app.use('/comment', comment)

const __main = (port=3000, host='') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
    })
}

// 这是分支的测试

if (require.main === module) {
    const port = 5000
    const host = '0.0.0.0'
    __main(port, host)
}
