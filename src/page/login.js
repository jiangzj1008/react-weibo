import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import {Link} from 'react-router-dom'

import {ajax} from '../tools/tool.js'

const FormItem = Form.Item

class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const request = {
                    method: "post",
                    path: "/login",
                    data: values,
                    contentType: "application/json",
                    callBack: function (r) {
                        var data = JSON.parse(r)
                        if (data.success) {
                            sessionStorage.setItem('uid', data.data)
                            window.location.pathname = '/'
                        }
                    }
                }
                ajax(request)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props)
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
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>
        )
    }
}

const WrappedLoginForm = Form.create()(Login)
export default WrappedLoginForm;
