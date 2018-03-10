import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import * as WeiboActions from './actions/weibo_action'
import * as CommentActions from './actions/comment_action'

// 引入组件
import Header from './components/header'
import Home from './page/home'
import Login from './page/login'
import Register from './page/register'

class Main extends Component {
    render() {
        const {weibos, actions, commentActions} = this.props
        console.log(this.props)
        return (
            <div>
                <WeiboAdd addWeibo={actions.addWeibo} />
                <WeiboList weibos={weibos} actions={actions} commentActions={commentActions}/>
            </div>
        )
    }
}

Main.propTypes = {
    weibos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    weibos: state
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(WeiboActions, dispatch),
    commentActions: bindActionCreators(CommentActions, dispatch),
})

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

export default AppContainer
