import React, { Component } from 'react'

import {ajax} from '../tools/tool.js'
import CommentItem from './comment_item'

class CommentList extends Component {
    // componentDidMount() {
    //     const allComment = this.props.commentActions.allComment
    //     this.getData((res) => {
    //         var d = JSON.parse(res)
    //         console.log(d)
    //         allComment(d.data)
    //     })
    // }
    //
    // getData(callback) {
    //     const wid = this.props.weibo_id
    //     var req = {
    //         path: `/comment/all/${wid}`,
    //         method: 'get',
    //         contentType: 'application/json',
    //         callBack: callback,
    //     }
    //     ajax(req)
    // }

    render() {
        const {commentList} = this.props
        const itemlist = commentList.map((c) => {
            const {comment, user} = c
            return (
                <CommentItem key={comment.id} comment={comment} user={user}/>
            )
        })
        return (
            <div>
                <h4>评论列表</h4>
                <ul>
                    {itemlist}
                </ul>
            </div>
        )
    }
}

export default CommentList;
