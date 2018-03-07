import React, { Component } from 'react'

// 引入组件
import CommentItem from './comment_item'

class CommentList extends Component {
    render() {
        console.log(this.props)
        const {comments, commentActions, weibo_id} = this.props
        const itemlist = comments.map((c) =>
            <CommentItem key={c.id} comment={c} {...commentActions} weibo_id={weibo_id}/>
        )
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
