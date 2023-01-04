import React from 'react'
import { Spin } from 'antd'

type Props = {
    loading: boolean
}
export const PageLoading = (props: Props) => {
    const { loading } = props
    return (
        <div style={{ paddingTop: '20%', textAlign: 'center' }}>
            <Spin spinning={loading} size="large" />
        </div>
    )
}