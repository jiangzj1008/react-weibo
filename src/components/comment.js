import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as CommentActions from '../actions/comment_action'

import CommentAdd from './comment_add'
import CommentList from './comment_list'

class Main extends Component {
    render() {
        const {comments, weibo_id, commentActions} = this.props
        return (
            <div>
                <CommentAdd/>
                <CommentList comments={comments} weibo_id={weibo_id} commentActions={commentActions}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    comments: state
})

const mapDispatchToProps = dispatch => ({
    commentActions: bindActionCreators(CommentActions, dispatch),
})

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

export default AppContainer
