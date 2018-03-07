import React, { Component } from 'react'

class WeiboAdd extends Component {
    state = {
        text: ''
    }

    handleSubmit = () => {
        const text = this.state.text.trim()
        if (text.length > 0) {
            this.props.addWeibo(text)
        }
        let newState = {
            text: ''
        }
        this.setState(newState)
    }

    handleChange = e => {
        let val = e.target.value
        let newState = {
            text: val
        }
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <h4>微博</h4>
                <input
                    placeholder="输入微博内容"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>添加</button>
            </div>
        )
    }
}

export default WeiboAdd;
