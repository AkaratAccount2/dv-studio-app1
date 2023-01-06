import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { Auth } from '../services/auth.service'
import { DispatchContext, StateContext } from '../provider/app.provider'
import { GetMenuDropDown } from './menu.dropdown'
import { Menu } from 'antd'
import { UserOutlined, LoginOutlined } from '@ant-design/icons'

export const MenuHeader = () => {
    let history = useHistory()
    const dispatch = useContext(DispatchContext)
    const state = useContext(StateContext)
    const { user: { username } } = state
      
    const menu = (
        <Menu onClick={handleMenuClick} className="dropdown-menu-item" style={{ minWidth: 327}}>
            <Menu.Item key="user">
                <UserOutlined />
                <span>{username}</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
                <LoginOutlined />
                <span>logout</span>
            </Menu.Item>
        </Menu>
    )

    function handleMenuClick(e: any) {
        if (e.key === 'logout') {
            Auth.logout(() => {
                dispatch({ type: 'logout' })
                history.push("/")
            })
        }    
    }

    return <GetMenuDropDown menu={menu} />
}