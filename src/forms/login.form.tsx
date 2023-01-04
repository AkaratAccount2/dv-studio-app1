import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'
import { State } from '../types/app.type'

type LoginProps = {
    data: State
    form: FormInstance
    onFinish: any
    dispatch: any
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

export default function LogInForm(props: LoginProps) {
    return (
        <Form
            {...layout}
            form={props.form}
            name="login-form"
            initialValues={{ username:'', password:'' }}
            onFinish={props.onFinish}
        >
            {props.data.error && <p className="error">{props.data.error}</p>}
            <Form.Item
                label="Username"
                name="Username"
                rules={[{ required: true, message: 'Username is required'}]}
            >
                <Input 
                    placeholder="username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    value={props.data.user.username}
                    onChange={e => props.dispatch({
                            type: 'field',
                            fieldName: 'username',
                            payload: e.currentTarget.value
                        })
                    }
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="Password"
                rules={[{ required: true, message: 'Password is required' }]}
            >
                <Input 
                    placeholder="password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    autoComplete="new-password"
                    value={props.data.user.password}
                    onChange={e => props.dispatch({
                            type: 'field',
                            fieldName: 'password',
                            payload: e.currentTarget.value,
                        })
                    }
                />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={props.data.isLoading} disabled={props.data.isLoading}>
                    {props.data.isLoading ? 'Logging in...' : 'Log In'}
                </Button>
            </Form.Item>
        </Form>
    )
}