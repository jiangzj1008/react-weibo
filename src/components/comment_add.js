import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import {ajax} from '../tools/tool.js'

const FormItem = Form.Item

class CommentAdd extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                // const request = {
                //     method: "post",
                //     path: "/login",
                //     data: values,
                //     contentType: "application/json",
                //     callBack: function (r) {
                //         var data = JSON.parse(r)
                //         if (data.success) {
                //             sessionStorage.setItem('uid', data.data)
                //             window.location.pathname = '/'
                //         }
                //     }
                // }
                // ajax(request)
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

