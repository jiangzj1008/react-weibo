import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import {Link} from 'react-router-dom'

import {ajax} from '../tools/tool.js'

const FormItem = Form.Item

class Register extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const request = {
                    method: "post",
                    path: "/register",
                    data: values,
                    contentType: "application/json",
                    callBack: function (r) {
                        var data = JSON.parse(r)
                        if (data.success) {
                            sessionStorage.setItem('uid', data.data)
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
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        register
                    </Button>
                    Or <Link to="/login">log in now!</Link>
                </FormItem>
            </Form>
        )
    }
}

const WrappedRegisterForm = Form.create()(Register)
export default WrappedRegisterForm;
