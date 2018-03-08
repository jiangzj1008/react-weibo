import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import {Link} from 'react-router-dom'

const SubMenu = Menu.SubMenu
// const MenuItemGroup = Menu.ItemGroup

class Memus extends Component {
	state = {
		current: 'home',
		nowPath: '',
	}

	// 初始化页面的钩子
	constructor(props) {
		super(props)
		let c = window.location.pathname
		let url = c.slice(1)
		if(c === ' ' || c === '/'){
			url = 'home'
		}
		this.state.current = url
	}

	// 跳路由
	jump = item => {
		this.setState({
			current: item.key,
		})
	}

	render() {
		return (
			<Menu
				onClick={this.jump}
				selectedKeys={[this.state.current]}
				mode="horizontal">
				<Menu.Item key="home">
					<Link to="/">
						<Icon type="home"/>
						微博
					</Link>
				</Menu.Item>
				<SubMenu title={<span><Icon type="user"/>个人中心</span>}>
                    <Menu.Item key="profile">
                        <Link to="/profile">
                            <Icon type="profile"/>
                            主页
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="register">
                        <Link to="/register">
                            <Icon type="desktop"/>
                            注册
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="login">
                        <Link to="/login">
                            <Icon type="login"/>
                            登录
                        </Link>
                    </Menu.Item>
				</SubMenu>
			</Menu>
		)
	}
}
export default Memus
