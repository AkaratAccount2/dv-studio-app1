import React from 'react'
import LogInPage from './login/login.page'
import { Image } from 'antd'

const imageUrl = `${process.env.PUBLIC_URL}/apple-icon-180x180.png`;

export function LandingPage() {
    return (
        <div style={{ paddingTop: '38px', textAlign: 'center' }}>
            <div className="welcome" style={{ paddingBottom: '20px' }}>
                <div style={{ marginBottom: '0px' }}>
                    <Image preview={false}
                        width={180}
                        src={imageUrl}
                    />
                </div>
                {/* <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Davinci Blue Studio</div> */}
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '-2px' ,marginTop: '0px' }}>(Art Gallary & Education School)</div>
            </div>
            <LogInPage />
        </div>
    )
}