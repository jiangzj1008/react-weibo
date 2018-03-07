const express = require('express')

const User = require('../models/user')

const {log} = require('../utils')
const {
    currentUser,
    adminRequired
} = require('./main')

const admin = express.Router()

admin.get('/', adminRequired, (request, response) => {
    const users = User.all()
    const args = {
        users: users,
    }
    response.render('admin/index.html', args)
})

admin.post('/update', adminRequired, (request, response) => {
    const form = request.body
    User.update(form)
    response.redirect('/admin')
})

module.exports = admin

