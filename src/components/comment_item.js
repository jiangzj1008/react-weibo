import React, { Component } from 'react'
import {Button} from 'antd'

import {ajax} from '../tools/tool.js'

class CommentItem extends Component {
    handleDelete = () => {
        const {comment, commentActions} = this.props
        const deleteComment = commentActions.deleteComment
        const request = {
            method: "get",
            path: `/comment/delete/${comment.id}`,
            data: null,
            contentType: "application/json",
            callBack: function (res) {
                const r = JSON.parse(res)
                if (r.success) {
                    deleteComment(r.data)
                }
            }
        }
        ajax(request)
    }

    render() {
        const {comment,user} = this.props
        return (
            <li>
                <p>
                    <b>{user.username}: </b>
                    <span>{comment.content}</span>
                </p>
                <Button onClick={this.handleDelete} type="danger" shape="circle" icon="close" size="small"/>
            </li>
        )
    }
}

export default CommentItem;
