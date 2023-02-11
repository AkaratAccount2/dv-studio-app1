import React, { useContext } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { StateContext } from '../provider/app.provider'
import { Layout, Menu } from 'antd'
import { AppstoreOutlined, OrderedListOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;
export const MenuSider = () => {
    const state = useContext(StateContext)
    //state.collapsed
    return (
        <Router>
            <Layout.Sider
                breakpoint="lg"
                trigger={null}
                collapsible
                collapsed={state.collapsed}
                collapsedWidth={0}
                theme="dark"
                // width="295"
                style={{
                    cursor: 'pointer'
                }}
                onBreakpoint={(broken) => {
                    //console.log(broken);
                }}
            >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['7']}>
                    <SubMenu key="submenu_1" icon={<OrderedListOutlined />} title="Pupil Management">
                        <Menu.Item key="1_1">
                            <Link to="/profile/create">New Registration</Link>
                        </Menu.Item>
                        <Menu.Item key="1_2">
                            <Link to="/profile/search">Search Pupil</Link>
                        </Menu.Item>

                    </SubMenu>
                    <SubMenu key="submenu_2" icon={<OrderedListOutlined />} title="Course Management">
                        <Menu.Item key="2_1">
                            <Link to="/profile/course/create">New Course</Link>
                        </Menu.Item>
                        <Menu.Item key="2_2">
                            <Link to="/class/search">Search Course</Link>
                        </Menu.Item>
                        <Menu.Item key="2_3">
                            <Link to="/payment/create">New Payment</Link>
                        </Menu.Item>
                        <Menu.Item key="2_4">
                            <Link to="/payment/search">Search Payment</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Layout.Sider>
        </Router>
    )
}

{/* <SubMenu key="submenu_1" icon={<OrderedListOutlined />} title="Custmer Management">
                            <SubMenu key="submenu_1_1" title="Order List">
                                <Menu.Item key="7">
                                    <Link to="/orders">Grab Order</Link>
                                </Menu.Item>
                                <Menu.Item key="7_2">
                                    <Link to="/orders/retry">Grab Order Retry</Link>
                                </Menu.Item>
                            </SubMenu>
                    </SubMenu>
*/}