import React, { Component } from 'react'

import {ajax} from '../tools/tool.js'
import WeiboItem from './weibo_item'

class WeiboList extends Component {
    componentDidMount() {
        const allWeibo = this.props.weiboActions.allWeibo
        this.getData((res) => {
            var d = JSON.parse(res)
            allWeibo(d.data)
        })
    }

    getData(callback) {
        var req = {
            path: '/weibo/all',
            method: 'get',
            contentType: 'application/json',
            callBack: callback,
        }
        ajax(req)
    }

    render() {
        const {weibos, weiboActions, commentActions} = this.props
        const deleteWeibo = weiboActions.deleteWeibo
        const list = weibos.map((item) => {
            const {weibo} = item
            return <WeiboItem key={weibo.id} weiboItem={item} deleteWeibo={deleteWeibo} commentActions={commentActions}/>
        })
        return (
            <ul className="weibo_list">
                {list}
            </ul>
        )
    }
}

export default WeiboList;
