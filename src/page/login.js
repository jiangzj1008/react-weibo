import React, { Component } from 'react'

var ajax = (method, path, data, callback) => {
    var r = new XMLHttpRequest()
    // var host = 'http://localhost:5000'
    // path = host + path
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            callback(r.response)
        }
    }
    r.send(data)
}

class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    handleSubmit = () => {
        ajax("post", "/login", this.state, function(r) {
            console.log(r)
        })
        let newState = {
            username: "",
            password: "",
        }
        this.setState(newState)
    }

    handleChange = e => {
        const val = e.target.value
        const key = e.target.name
        let newState = {
            [key]: val
        }
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <h4>登录</h4>
                <input
                    placeholder="用户名"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                />
                <input
                    placeholder="密码"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                />
                <button onClick={this.handleSubmit}>登录</button>
            </div>
        )
    }
}

export default Login;
