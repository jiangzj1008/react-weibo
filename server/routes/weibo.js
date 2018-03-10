const express = require('express')

const Weibo = require('../models/weibo')
const Comment = require('../models/comment')
const User = require('../models/user')

const {log} = require('../utils')
const {
    currentUser,
    loginRequired,
    weiboOwnerRequire,
} = require('./main')

const weibo = express.Router()


weibo.get('/', loginRequired, (request, response) => {
    const u = currentUser(request)
    const uId = Number(u.id)
    const weibos = Weibo.findAll('userId', uId)
    const args = {
        weibos: weibos,
        user: u,
    }
    response.render('weibo/weibo_index.html', args)
})

weibo.get('/all', (request, response) => {
    const dict = Weibo.getall()
    response.json(dict)
})

weibo.get('/user/:userId', (request, response) => {
    const u = currentUser(request)
    const authorId = Number(request.params.userId || u.id)
    const author = User.get(authorId)
    const weibos = Weibo.findAll('userId', authorId)
    const args = {
        weibos: weibos,
        user: author,
    }
    response.render('weibo/weibo_index.html', args)
})

weibo.get('/new', loginRequired, (request, response) => {
    response.render('weibo/weibo_new.html')
})

weibo.post('/add', loginRequired, (request, response) => {
    const u = currentUser(request)
    const form = request.body
    form.userId = u.id
    const dict = Weibo.create(form)
    response.json(dict)
})

weibo.post('/delete/:weiboId', weiboOwnerRequire, (request, response) => {
    const weiboId = Number(request.params.weiboId)
    const dict = Weibo.remove(weiboId)
    response.json(dict)
})

weibo.get('/edit/:weiboId', weiboOwnerRequire, (request, response) => {
    const weiboId = Number(request.params.weiboId)
    const w = Weibo.get(weiboId)
    const args = {
        weibo: w,
    }
    response.render('weibo/weibo_edit.html', args)
})

weibo.post('/update', weiboOwnerRequire, (request, response) => {
    const form = request.body
    Weibo.update(form)
    response.redirect('/weibo')
})

module.exports = weibo
