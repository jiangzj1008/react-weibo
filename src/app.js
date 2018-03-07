import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Login from './page/login'
import Register from './page/register'

class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/login">登陆</Link></li>
                        <li><Link to="/register">注册</Link></li>
                    </ul>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </div>
            </Router>
        )
    }
}

export default Main