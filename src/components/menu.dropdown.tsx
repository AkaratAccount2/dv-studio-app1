import React from 'react'
import { Avatar, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export const GetMenuDropDown = (props: any) => {
    return (
        <div id="dropdown-menu">
            <Dropdown 
                placement="bottomRight"
                overlay={props.menu}
            >
                <Button type="link" className="ant-dropdown-link" style={{float: 'right', padding: '16px 0'}} onClick={e => e.preventDefault()}>
                    <Avatar style={{backgroundColor: '#ff4500'}} icon={<UserOutlined />} />
                </Button>
            </Dropdown>
        </div>
    )
}