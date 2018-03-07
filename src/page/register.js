import React, { Component } from 'react'

class Register extends Component {
    state = {
        username: "",
        password: "",
    }

    handleSubmit = () => {
        const text = this.state.text.trim()
        if (text.length > 0) {
            // this.props.addWeibo(text)
        }
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
                <h4>注册</h4>
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
                <button onClick={this.handleSubmit}>注册</button>
            </div>
        )
    }
}

export default Register;
