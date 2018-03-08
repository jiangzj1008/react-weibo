import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Header from './components/header'
import Home from './page/home'
import Login from './page/login'
import Register from './page/register'

class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <div >
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Main