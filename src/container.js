import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from './actions/index'

// 引入组件
import TodoList from './components/todo_list'
import TodoAdd from './components/todo_add'

class Main extends Component {
    render() {
        const {todos, actions} = this.props
        return (
            <div>
                <TodoAdd addTodo={actions.addTodo} />
                <TodoList todos={todos} actions={actions} />
            </div>
        )
    }
}

Main.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    todos: state
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

export default AppContainer
