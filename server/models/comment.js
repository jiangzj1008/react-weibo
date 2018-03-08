const Model = require('./main')
const User = require('./user')

class Comment extends Model {
    constructor(form={}, userId=-1) {
        super(form)
        this.content = form.content || ''
        this.userId = Number('userId' in form ? form.userId : userId)
        this.weiboId = Number('weiboId' in form ? form.weiboId : -1)
        this.deleted = 'deleted' in form ? form.deleted : false
    }

    static update(form) {
        const id = Number(form.id)
        const c = this.get(id)
        const validNames = [
            'content',
        ]
        Object.keys(form).forEach(k => {
            if (validNames.includes(k)) {
                c[k] = form[k]
            }
        })
        c.updated_time = Date.now()
        c.save()
        return c
    }

    static remove(id) {
        const c = this.get(id)
        c.deleted = true
        c.updated_time = Date.now()
        c.save()
        return c
    }

    isOwner(id) {
        return this.userId === id
    }

    user() {
        const u = User.get(this.userId)
        return u
    }
}

module.exports = Comment