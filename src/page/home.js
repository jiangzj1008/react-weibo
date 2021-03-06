import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as WeiboActions from '../actions/weibo_action'
import * as CommentActions from '../actions/comment_action'

import WeiboInput from '../components/weibo_input'
import WeiboList from '../components/weibo_list'

class Main extends Component {
    render() {
        const {weibos, weiboActions, commentActions} = this.props
        return (
            <div>
                <WeiboInput weiboActions={weiboActions}/>
                <WeiboList weibos={weibos} weiboActions={weiboActions} commentActions={commentActions}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    weibos: state
})

const mapDispatchToProps = dispatch => ({
    weiboActions: bindActionCreators(WeiboActions, dispatch),
    commentActions: bindActionCreators(CommentActions, dispatch),
})

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

export default AppContainer
