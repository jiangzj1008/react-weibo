const Model = require('./main')
const Comment = require('./comment')
const User = require('./user')

class Weibo extends Model {
    constructor(form={}, userId=-1) {
        super(form)
        this.content = form.content || ''
        this.userId = Number('userId' in form ? form.userId : userId)
        this.deleted = form.deleted || false
    }

    static update(form) {
        const id = Number(form.id)
        const w = this.get(id)
        const validNames = [
            'content',
        ]
        Object.keys(form).forEach(k => {
            if (validNames.includes(k)) {
                w[k] = form[k]
            }
        })
        w.updated_time = Date.now()
        w.save()
        return w
    }

    static remove(id) {
        const w = Weibo.get(id)
        w.deleted = true
        w.updated_time = Date.now()
        w.save()
        return w
    }

    isOwner(id) {
        return this.userId === id
    }

    user() {
        const u = User.get(this.userId)
        return u
    }

    comments() {
        return Comment.findAll('weiboId', this.id)
    }
}

module.exports = Weibo
