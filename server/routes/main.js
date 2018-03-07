const User = require('../models/user')
const Weibo = require('../models/weibo')
const Comment = require('../models/comment')
const Todo = require('../models/todo')

const { log } = require('../utils')

const currentUser = (request) => {
    // 通过 session 获取 uid, 如果没有的话就设置成空字符串
    const uid = request.session.uid || -1
    const u = User.get(uid)
    if (u === null) {
        return User.guest()
    } else {
        return u
    }
}

const loginRequired = (request, response, next) => {
    const u = currentUser(request)
    if (u.id === -1) {
        // log('登录检测: 没有登录', request.method)
        const baseUrl = '/'
        if (request.method === 'POST') {
            response.redirect(baseUrl)
        } else {
            // 应该用一个函数来生成 url, 这里的写法实际上并不好, 因为以后可能还会添加相关的数据
            const nextUrl = baseUrl + '?next_url=' + request.originalUrl
            response.redirect(nextUrl)
        }
    } else {
        // 如果登录了就什么都不做, 继续下一个请求函数
        // 下一个请求函数直接用 next
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