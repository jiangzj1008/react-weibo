import React, { Component } from 'react'

class TodoAdd extends Component {
    state = {
        text: ''
    }

    handleSubmit = () => {
        const text = this.state.text.trim()
        if (text.length > 0) {
            this.props.addTodo(text)
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
                <h4>添加待办事项</h4>
                <input
                    placeholder="待办事项"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>添加</button>
            </div>
        )
    }
}

export default TodoAdd;
