import React, { Component } from 'react'

// 引入组件
import WeiboItem from './weibo_item'

class WeiboList extends Component {
    render() {
        const {weibos, actions, commentActions} = this.props
        const itemlist = weibos.map((weibo) =>
            <WeiboItem key={weibo.id} weibo={weibo} {...actions} commentActions={commentActions}/>
        )
        return (
            <div>
                <h4>微博列表</h4>
                <ol>
                    {itemlist}
                </ol>
            </div>
        )
    }
}

export default WeiboList;
