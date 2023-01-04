import React from 'react'
import LogInPage from './login/login.page'

export function LandingPage() {
    return  (
        <div style={{ paddingTop: '38px', textAlign: 'center' }}>
            <div className="welcome" style={{ paddingBottom: '20px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Davinci Studio</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '-2px' }}>(Art Education School)</div>
            </div>
            <LogInPage />
        </div>
    )
}