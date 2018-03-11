import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import {ajax} from '../tools/tool.js'

const FormItem = Form.Item

class CommentAdd extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const weiboId = this.props.weiboId
        const addComment = this.props.commentActions.addComment
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = Object.assign({}, values, {
                    weiboId: weiboId,
                })
                const request = {
                    method: "post",
                    path: "/comment/add",
                    data: data,
                    contentType: "application/json",
                    callBack: function (res) {
                        const r = JSON.parse(res)
                        if (r.success) {
                            addComment(r.data)
                        }
                    }
                }
                ajax(request)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} layout="inline" className="login-form">
                <FormItem>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input your comment!' }],
                    })(
                        <Input prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="comment" size="small" />
                    )}
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" size="small">
                        添加评论
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedMain = Form.create()(CommentAdd)
export default WrappedMain;

