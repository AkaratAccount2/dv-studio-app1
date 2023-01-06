import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';


export function UserNotFoundPage() { 
    let history = useHistory()
    return (
        <div className="not-found">
            <h1>User Not Found</h1>
            <h3>Sorry, username or password is wrong</h3>
            <Button 
                type="link" 
                onClick={() => history.goBack()} 
                icon={<LogoutOutlined />}
            >
                Back To Home
            </Button>
        </div>
    )
}