import React, { Component } from 'react'

// import CommentAdd from './comment_add'
// import CommentList from './comment_list'

class WeiboItem extends Component {
    handleDelete = () => {
        // const {weibo, deleteWeibo} = this.props
        // deleteWeibo(weibo.id)
    }

    render() {
        const {content} = this.props.weibo
        return (
            <li>
                <div>
                    <span>{content}</span>
                    <button onClick={this.handleDelete}>删除</button>
                </div>
            </li>
        )
    }
}

export default WeiboItem;
