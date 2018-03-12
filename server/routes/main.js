const User = require('../models/user')
const Weibo = require('../models/weibo')
const Comment = require('../models/comment')

const { log } = require('../utils')

const currentUser = (request) => {
    const uid = request.session.uid || -1
    const u = User.get(uid)
    if (u === null) {
        return User.guest()
    } else {
        return u
    }
}

// const currentUser = (request) => {
//     const uid = Number(request.body.uid || -1)
//     const u = User.get(uid)
//     if (u === null) {
//         return User.guest()
//     } else {
//         return u
//     }
// }

const loginRequired = (request, response, next) => {
    const u = currentUser(request)
    if (u.id === -1) {
        const baseUrl = '/'
        if (request.method === 'POST') {
            response.redirect(baseUrl)
        } else {
            const nextUrl = baseUrl + '?next_url=' + request.originalUrl
            response.redirect(nextUrl)
        }
    } else {
        next()
    }
}

const weiboOwnerRequire = (request, response, next) => {
    const u = currentUser(request)
    const id = Number(request.params.weiboId | request.body.id)
    const w = Weibo.get(id)
    if (!w.isOwner(u.id)) {
        const baseUrl = '/'
        response.redirect(baseUrl)
    } else {
        next()
    }
}

const commentOwnerRequire = (request, response, next) => {
    const u = currentUser(request)
    const id = Number(request.params.commentId | request.body.id)
    const c = Comment.get(id)
    if (!c.isOwner(u.id)) {
        const w = Weibo.get(c.weiboId)
        const baseUrl = `/weibo/user/${w.userId}`
        response.redirect(baseUrl)
    } else {
        next()
    }
}

const todoOwnerRequire = (request, response, next) => {
    const u = currentUser(request)
    const id = Number(request.params.todoId | request.body.id)
    const t = Todo.get(id)
    if (!t.isOwner(u.id)) {
        const baseUrl = '/todo'
        response.redirect(baseUrl)
    } else {
        next()
    }
}

const adminRequired = (request, response, next) => {
    const u = currentUser(request)
    if (u.isAdmin()) {
        next()
    } else {
        response.redirect('/')
    }
}

module.exports = {
    currentUser,
    loginRequired,
    weiboOwnerRequire,
    commentOwnerRequire,
    todoOwnerRequire,
    adminRequired,
}