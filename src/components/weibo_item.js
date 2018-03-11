import React, { Component } from 'react'
import { Button } from 'antd';

import CommentAdd from './comment_add'
import CommentList from './comment_list'

import {ajax} from '../tools/tool.js'

class WeiboItem extends Component {
    getData(method, path, callback) {
        const {weibo} = this.props.weiboItem
        const wid = weibo.id
        const uid = sessionStorage.getItem('uid')
        const d = Object.assign({}, {
            uid: uid,
        })
        const request = {
            method: method,
            path: `${path}/${wid}`,
            data: d,
            contentType: "application/json",
            callBack: callback,
        }
        ajax(request)
    }

    handleDelete = () => {
        const deleteWeibo = this.props.deleteWeibo
        this.getData("post", "/weibo/delete", (res) => {
            const r = JSON.parse(res)
            if (r.success) {
                const payload = {
                    wid: r.data.id
                }
                deleteWeibo(payload)
            }
        })
    }

    commentShow = () => {
        const {weibo} = this.props.weiboItem
        const allComment = this.props.commentActions.allComment
        this.getData("get", "/comment/all", (res) => {
            const r = JSON.parse(res)
            if (r.success) {
                const payload = {
                    weiboId: weibo.id,
                    commentList: r.data
                }
                allComment(payload)
            }
        })
    }

    commentHide = () => {
        const {weibo} = this.props.weiboItem
        const hideComment = this.props.commentActions.hideComment
        const payload = {
            weiboId: weibo.id
        }
        hideComment(payload)
    }

    renderCommentList() {
        const {weiboItem, commentActions} = this.props
        const {weibo, commentList} = weiboItem
        if (commentList === undefined) {
            return ''
        } else {
            return (
                <div className="comment_list">
                    <CommentAdd weiboId={weibo.id} commentActions={commentActions}/>
                    <CommentList commentList={commentList} commentActions={commentActions}/>
                </div>
            )
        }
    }

    renderCommentButton() {
        const {commentList} = this.props.weiboItem
        if (commentList === undefined) {
            return (
                <Button onClick={this.commentShow}>展开评论</Button>
            )
        } else {
            return (
                <Button onClick={this.commentHide}>收起评论</Button>
            )
        }
    }

    render() {
        const {weibo, user} = this.props.weiboItem
        const list = this.renderCommentList()
        const btn = this.renderCommentButton()
        return (
            <li className="weibo_item">
                <div>
                    <p>
                        <b>{user.username}: </b>
                        <span>{weibo.content}</span>
                    </p>
                    <div className="weibo_controls">
                        {btn}
                        <Button type="danger" onClick={this.handleDelete}>删除</Button>
                    </div>
                    {list}
                </div>
            </li>
        )
    }
}

export default WeiboItem;
