import React, { Component } from 'react'

// 引入组件
import TodoItem from './todo_item'

class TodoList extends Component {
    render() {
        const {todos, actions} = this.props
        const itemlist = todos.map((todo) =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
        )
        return (
            <div>
                <h4>待办事项列表</h4>
                <ol>
                    {itemlist}
                </ol>
            </div>
        )
    }
}

export default TodoList;
