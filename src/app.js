import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Login from './page/login'

class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
        )
    }
}

export default Main