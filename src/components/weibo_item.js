import React, { Component } from 'react'
import { Button } from 'antd';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// 引入 reducer
// import reducer from '../reducer/comments'

import CommentAdd from './comment_add'
import CommentList from './comment_list'

import {ajax} from '../tools/tool.js'

// import Comment from './comment'

// const commentStore = createStore(reducer)

class WeiboItem extends Component {
    handleDelete = () => {
        const deleteWeibo = this.props.deleteWeibo
        this.sendData((res) => {
            const r = JSON.parse(res)
            if (r.success) {
                const payload = {
                    wid: r.data.id
                }
                deleteWeibo(payload)
            }
        })
    }

    showComment = () => {
        const allComment = this.props.commentActions.allComment
        this.commentAll((res) => {
            const r = JSON.parse(res)
            if (r.success) {
                allComment(r.data)
            }
        })
    }

    commentAll(callback) {
        const {weibo} = this.props.weiboItem
        const wid = weibo.id
        const uid = sessionStorage.getItem('uid')
        const d = Object.assign({}, {
            uid: uid,
        })
        const request = {
            method: "get",
            path: `/comment/all/${wid}`,
            data: d,
            contentType: "application/json",
            callBack: callback,
        }
        ajax(request)
    }

    sendData(callback) {
        const {weibo} = this.props.weiboItem
        const wid = weibo.id
        const uid = sessionStorage.getItem('uid')
        const d = Object.assign({}, {
            uid: uid,
        })
        const request = {
            method: "post",
            path: `/weibo/delete/${wid}`,
            data: d,
            contentType: "application/json",
            callBack: callback,
        }
        ajax(request)
    }

    renderComment() {
        const {commentList} = this.props.weiboItem
        if (commentList === undefined) {
            return ''
        } else {
            return (
                <div className="comment_list">
                    <CommentAdd/>
                    <CommentList commentList={commentList}/>
                </div>
            )
        }
    }

    render() {
        const {weibo, user} = this.props.weiboItem
        const comment = this.renderComment()
        return (
            <li className="weibo_item">
                <div>
                    <p>
                        <b>{user.username}: </b>
                        <span>{weibo.content}</span>
                    </p>
                    <div className="weibo_controls">
                        <Button onClick={this.showComment}>评论</Button>
                        <Button type="danger" onClick={this.handleDelete}>删除</Button>
                    </div>
                    {comment}
                    {/*<div className="comment_list">*/}
                        {/*<Provider store={commentStore}>*/}
                            {/*<Comment weibo_id={weibo.id}/>*/}
                        {/*</Provider>*/}
                    {/*</div>*/}
                </div>
            </li>
        )
    }
}

export default WeiboItem;
