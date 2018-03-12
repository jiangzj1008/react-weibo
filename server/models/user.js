const Model = require('./main')
const crypto = require('crypto')

class User extends Model {
    constructor(form={}) {
        super(form)
        this.username = form.username || ''
        this.password = form.password || ''
        this.note = form.note || ''
        this.role = form.role || 2
    }

    static create(form={}) {
        form.password = this.saltedPassword(form.password)
        const u = super.create(form)
        return u
    }

    static saltedPassword(password, salt='sd3SDFU(*IJ)') {
        const salted = password + salt
        const hash = crypto.createHash('sha256')
        hash.update(salted)
        const h = hash.digest('hex')
        return h
    }

    // 校验登录的逻辑
    static validateLogin(form) {
        const {username, password} = form
        const u = this.findBy('username', username)
        const valid = u !== null && u.password === this.saltedPassword(password)
        const dict = {
            success: false,
            data: null,
            msg: '',
        }
        if (valid) {
            const u = User.findBy('username', form.username)
            dict.data = u.id
            dict.success = true
        }
        return dict
    }

    // 校验注册的逻辑
    static validateRegister(form) {
        const {username, password} = form
        const validUsername = username.length > 2
        const validPassword = password.length > 2
        const uniqueUsername = User.findBy('username', username) === null
        const valid = validUsername && validPassword && uniqueUsername
        const dict = {
            success: false,
            data: null,
            msg: '',
        }
        if (valid) {
            const u = this.create(form)
            dict.data = u
            dict.success = true
        }
        return dict
    }

    static guest() {
        const o = {
            id: -1,
            username: '游客',
        }
        const u = this.create(o)
        return u
    }

    static update(form) {
        const uid = Number(form.userid)
        const u = this.get(uid)
        form.password = this.saltedPassword(form.password)
        const validNames = [
            'password',
        ]
        Object.keys(form).forEach(k => {
            if (validNames.includes(k)) {
                u[k] = form[k]
            }
        })
        u.save()
    }

    isGuest() {
        return this.id === -1
    }

    isAdmin() {
        return this.role === 1
    }
}

module.exports = User
