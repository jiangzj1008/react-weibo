import React, { Component } from 'react'

class CommentItem extends Component {
    handleDelete = () => {
        const {weibo_id, comment, deleteComment} = this.props
        const payload = {
            comment_id: comment.id,
            weibo_id: weibo_id,
        }
        deleteComment(payload)
    }

    render() {
        const {comment} = this.props
        return (
            <li>
                <span>{comment.text}</span>
                <button onClick={this.handleDelete}>删除</button>
            </li>
        )
    }
}

export default CommentItem;
