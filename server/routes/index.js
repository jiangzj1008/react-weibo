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
    const dict = User.validateLogin(form)
    if (dict.success) {
        // response.cookie("uid", dict.data)
        request.session.uid = dict.data
    }
    response.json(dict)
})

index.post('/register', (request, response) => {
    const form = request.body
    const dict = User.validateRegister(form)
    if (dict.success) {
        request.session.uid = dict.data
    }
    response.json(dict)
})

index.get('/logout', (request, response) => {
    request.session = null
    response.redirect('/')
})

module.exports = index
