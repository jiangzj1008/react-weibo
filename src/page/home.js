import React, { Component } from 'react'

import WeiboInput from '../components/weibo_input'
import WeiboList from '../components/weibo_list'

import {log, ajax} from '../tools/tool.js'


class Main extends Component {
    render() {
        return (
            <div>
                <WeiboInput/>
                <WeiboList/>
            </div>
        )
    }
}

export default Main;
