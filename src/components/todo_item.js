import React, { Component } from 'react'

class TodoItem extends Component {
    handleDelete = () => {
        const {todo, deleteTodo} = this.props
        deleteTodo(todo.id)
    }

    handleComplete = () => {
        const {todo, completeTodo} = this.props
        completeTodo(todo.id)
    }

    render() {
        const {todo} = this.props
        var c = todo.completed? 'completed' : 'todo'
        return (
            <li>
                <p className={c}>{this.props.todo.text}</p>
                <button onClick={this.handleComplete}>完成</button>
                <button onClick={this.handleDelete}>删除</button>
            </li>
        )
    }
}

export default TodoItem;
