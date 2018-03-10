import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'

import {ajax} from '../tools/tool.js'

const FormItem = Form.Item
const {TextArea} = Input

class Main extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const addWeibo = this.props.weiboActions.addWeibo
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.sendData(values, (res) => {
                    const r = JSON.parse(res)
                    if (r.success) {
                        addWeibo(r.data)
                    }
                })
            }
        })
    }

    sendData(values, callback) {
        const uid = sessionStorage.getItem('uid')
        const d = Object.assign(values, {
            uid: uid,
        })
        const request = {
            method: "post",
            path: "/weibo/add",
            data: d,
            contentType: "application/json",
            callBack: callback,
        }
        ajax(request)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input your blog!' }],
                    })(
                        <TextArea placeholder="blog" autosize={{ minRows: 6, maxRows: 6 }} />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        publish
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedMain = Form.create()(Main)
export default WrappedMain;