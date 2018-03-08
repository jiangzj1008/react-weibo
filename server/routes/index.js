const express = require('express')

const User = require('../models/user')
const { log } = require('../utils')
const { currentUser } = require('./main')

const index = express.Router()

index.get('/', (request, response) => {
    const userList = User.all()
    const u = currentUser(request)
    const args = {
        users: userList,
        user: u,
    }
    response.render('index/index.html', args)
})

index.post('/login', (request, response) => {
    const form = request.body
    // console.log(form)
    const dict = {
        success: true,
        data: null,
        msg: '',
    }
    if (User.validateLogin(form)) {
        const u = User.findBy('username', form.username)
        request.session.uid = u.id
    } else {
        dict.success = false
    }
    response.json(dict)
})

index.post('/register', (request, response) => {
    const form = request.body
    const u = User.create(form)
    const dict = {
        success: true,
        data: null,
        msg: '',
    }
    if (u.username) {
        request.session.uid = u.id
    } else {
        dict.success = false
    }
    response.json(dict)
})

index.get('/logout', (request, response) => {
    // 注销登录的时候, 将 session 清空就可以了
    request.session = null
    response.redirect('/')
})

module.exports = index
