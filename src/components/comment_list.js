import React, { Component } from 'react'

import CommentItem from './comment_item'

class CommentList extends Component {
    renderCommentList() {
        const {commentList, commentActions} = this.props
        const items = commentList.map((c) => {
            const {comment, user} = c
            return (
                <CommentItem key={comment.id} comment={comment} user={user} commentActions={commentActions}/>
            )
        })
        return items
    }

    render() {
        const items = this.renderCommentList()
        return (
            <div>
                <h4>评论列表</h4>
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
}

export default CommentList;
