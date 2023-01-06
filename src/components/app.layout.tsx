import React from 'react'
import { Layout } from 'antd'
import { AppHeader } from './app.header'
import { AppContent } from './app.content'
import { AppFooter } from './app.footer'
import { MenuSider } from './menu.sider'

export function AppLayout() {
    return (
        <Layout>
            <MenuSider />
            <Layout className="site-layout" style={{ minHeight: '100vh' }}>
                <AppHeader />
                <AppContent />
                <AppFooter />
            </Layout>
        </Layout>
    )
}