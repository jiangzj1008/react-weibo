const express = require('express')

const Weibo = require('../models/weibo')
const Comment = require('../models/comment')
const User = require('../models/user')

const {log} = require('../utils')
const {
    currentUser,
    loginRequired,
    commentOwnerRequire,
} = require('./main')

const comment = express.Router()

comment.get('/all/:weiboId', (request, response) => {
    const weiboId = Number(request.params.weiboId)
    const dict = Comment.getall(weiboId)
    response.json(dict)
})

comment.post('/add', loginRequired, (request, response) => {
    const u = currentUser(request)
    const form = request.body
    form.userId = u.id
    const dict = Comment.create(form)
    response.json(dict)
})

comment.get('/delete/:commentId', commentOwnerRequire, (request, response) => {
    const commentId = Number(request.params.commentId)
    const dict = Comment.remove(commentId)
    response.json(dict)
})

comment.get('/edit/:commentId', commentOwnerRequire, (request, response) => {
    const id = Number(request.params.commentId)
    const c = Comment.get(id)
    const args = {
        comment: c,
    }
    response.render('comment/comment_edit.html', args)
})

comment.post('/update', commentOwnerRequire, (request, response) => {
    const form = request.body
    const c = Comment.update(form)
    const w = Weibo.get(c.weiboId)
    response.redirect(`/weibo/user/${w.userId}`)
})

module.exports = comment
