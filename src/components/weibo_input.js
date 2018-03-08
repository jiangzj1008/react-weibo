import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import {log, ajax} from '../tools/tool.js'

const FormItem = Form.Item
const {TextArea} = Input

class Main extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const request = {
                    method: "post",
                    url: "/weibo/add",
                    data: values,
                    contentType: "application/json",
                    callBack: function (r) {
                        var data = JSON.parse(r)
                        if (data.success) {
                            log(data.data)
                            // window.location.pathname = '/'
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