const express = require('express')

const Todo = require('../models/todo')
const {log} = require('../utils')
const {
    currentUser,
    loginRequired,
    todoOwnerRequire,
} = require('./main')

const todo = express.Router()

todo.get('/', loginRequired, (request, response) => {
    const u = currentUser(request)
    const todoList = Todo.findAll('userId', u.id)
    const args = {
        todos: todoList,
    }
    response.render('todo/todo_index.html', args)
})

todo.post('/add', loginRequired, (request, response) => {
    const form = request.body
    const u = currentUser(request)
    form.userId = u.id
    const t = Todo.create(form)
    response.redirect('/todo')
})

todo.get('/delete/:todoId', todoOwnerRequire, (request, response) => {
    const todoId = Number(request.params.todoId)
    const t = Todo.remove(todoId)
    response.redirect('/todo')
})

todo.get('/edit/:todoId', todoOwnerRequire, (request, response) => {
    const id = Number(request.params.todoId)
    const t = Todo.get(id)
    const args = {
        todo: t,
    }
    response.render('todo/todo_edit.html', args)
})

todo.post('/update', todoOwnerRequire, (request, response) => {
    const form = request.body
    const t = Todo.update(form)
    response.redirect('/todo')
})

todo.get('/complete/:todoId', todoOwnerRequire, (request, response) => {
    const id = Number(request.params.todoId)
    Todo.complete(id)
    response.redirect('/todo')
})

module.exports = todo
