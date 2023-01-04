import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';


export function NotFoundPage() { 
    let history = useHistory()
    return (
        <div className="not-found">
            <h1>404 Page Not Found</h1>
            <h3>Sorry, the page you visited does not exist.</h3>
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