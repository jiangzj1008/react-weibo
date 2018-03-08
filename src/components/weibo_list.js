import React, { Component } from 'react'

import {log, ajax} from '../tools/tool.js'
import WeiboItem from './weibo_item'


class WeiboList extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        this.getData((res) => {
            var d = JSON.parse(res)
            log(d)
            this.setState({
                data: d.data,
            })
        })
    }

    getData(callback) {
        var req = {
            url: '/weibo/all',
            method: 'get',
            contentType: 'application/json',
            callBack: callback,
        }
        ajax(req)
    }

    render() {
        const list = this.state.data.map((item) => {
            return <WeiboItem key={item.id} weibo={item}/>
        })
        return (
            <ul>
                {list}
            </ul>
        )
    }
}

export default WeiboList;
