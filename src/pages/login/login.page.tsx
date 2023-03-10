import React, { useContext, Suspense } from 'react'
import { Form, Row, Col, Card } from 'antd'
import { DispatchContext, StateContext } from '../../provider/app.provider'
import { useHistory } from 'react-router'

import { Auth, authen } from '../../services/auth.service'
import { PageLoading } from '../../components/page.loading'

const LogInForm = React.lazy(() => import('../../forms/login.form'))

export default function LogInPage() {

    let history = useHistory()
    const [form] = Form.useForm()
    const dispatch = useContext(DispatchContext)
    const state = useContext(StateContext)

    const onFinish = async () => {
        dispatch && dispatch({type: 'login'})
        try {
            const response = await authen(state.user)
            console.log('[API] check authen -> return')
            console.log(response)
            if (response.message === 'Success') {
                Auth.login(() => {
                    dispatch({ type: 'success' ,role: response.results.role ,grant_permission: response.results.grant_permission})
                    history.push("/admin")
                })
            } else if (response.message === 'Invalid username or password') {
                dispatch({ type: 'error', message: response.message })
                form.resetFields()
            } else if (response.message === 'User is not active') {
                dispatch({ type: 'error', message: response.message })
                form.resetFields()
            } else if (response.message === 'User is locked') {
                dispatch({ type: 'error', message: response.message })
                form.resetFields()
            } else if (response.message === 'User is expired') {
                dispatch({ type: 'error', message: response.message })
                form.resetFields()
            } else if (response.message === 'User is disabled') {
                dispatch({ type: 'error', message: response.message })
                form.resetFields()
            } else if (response.message === 'User is not found') {
                dispatch({ type: 'error', message: response.message })
                form.resetFields()
            } else if (response.message === 'Failed to fetch') {
                dispatch({ type: 'error', message: 'Connection is error ,please contact administrator' })
                form.resetFields()
            } else {
                dispatch({ type: 'error', message: response.message })
                history.push("/")
            }
        } catch (error) {
            console.error(error)
            form.resetFields()
            dispatch({ type: 'error', message: error })
        }
    }

    return (
        
        <Suspense fallback={<PageLoading loading={true} />}>
            <Row justify="center" align="middle">
                <Col>
                    <Card>
                        <LogInForm data={state} form={form} onFinish={onFinish} dispatch={dispatch} />
                    </Card>
                </Col>
            </Row>
        </Suspense>
    )
}