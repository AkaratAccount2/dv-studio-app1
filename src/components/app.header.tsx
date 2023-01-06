import React, { useContext } from 'react'
import { DispatchContext, StateContext } from '../provider/app.provider'
import { Layout} from 'antd'
import { MenuHeader } from './menu.header'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

export const AppHeader = () => {
    const state = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    const toggle = () => {
        dispatch && dispatch({type: 'collapsed'})
    }

    return (
        <Layout.Header className="site-layout-background" style={{ padding: '0 10px' }}>
            { 
                state.isLoggedIn && 
                <div className="container">
                    {
                        React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })
                    }
                    <MenuHeader />
                </div>
            }
        </Layout.Header>
    )
}