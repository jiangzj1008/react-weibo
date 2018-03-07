const Model = require('./main')

class Todo extends Model {
    constructor(form={}, userId=-1) {
        super(form)
        this.task = form.task || ''
        this.completed = form.completed || false
        this.userId = 'userId' in form ? form.userId : userId
    }

    static add(form, userId) {
        form.userId = userId
        Todo.create(form)
    }

    static update(form) {
        const todoId = Number(form.id)
        const t = this.get(todoId)
        const validNames = [
            'task',
        ]
        Object.keys(form).forEach(k => {
            if (validNames.includes(k)) {
                t[k] = form[k]
            }
        })
        t.updated_time = Date.now()
        t.save()
        return t
    }

    static complete(id) {
        const t = Todo.get(id)
        t.completed = !t.completed
        t.updated_time = Date.now()
        t.save()
        return t
    }

    isOwner(id) {
        return this.userId === id
    }
}

module.exports = Todo
