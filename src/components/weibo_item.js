import React, { Component } from 'react'

import CommentAdd from './comment_add'
import CommentList from './comment_list'

class WeiboItem extends Component {
    handleDelete = () => {
        const {weibo, deleteWeibo} = this.props
        deleteWeibo(weibo.id)
    }

    render() {
        const {weibo, commentActions} = this.props
        return (
            <li>
                <div>
                    <span>{weibo.text}</span>
                    <button onClick={this.handleDelete}>删除</button>
                </div>
                <div>
                    <CommentAdd addComment={commentActions.addComment} weibo_id={weibo.id}/>
                </div>
                <CommentList comments={weibo.comments} commentActions={commentActions} weibo_id={weibo.id}/>
            </li>
        )
    }
}

export default WeiboItem;
