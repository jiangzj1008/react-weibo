import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeiboActions from './actions/weibo_action'
import * as CommentActions from './actions/comment_action'

// 引入组件
import WeiboList from './components/weibo_list'
import WeiboAdd from './components/weibo_add'

class Main extends Component {
    render() {
        const {weibos, actions, commentActions} = this.props
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
