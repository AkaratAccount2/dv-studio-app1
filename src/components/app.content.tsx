import React ,{useContext,useEffect} from 'react'
import { HashRouter as Router, Route, Switch ,useLocation,Redirect} from 'react-router-dom'
import {  StateContext } from '../provider/app.provider'
import { Layout } from 'antd'
import PupilRegistration from './../pages/pupil.registration.page'
import PersonProfilePage from './../pages/pupil.profile.page'
import PupilSearch from './../pages/pupil.search.page'
import PupilLearnProfilePaege from './../pages/pupil.learn.profile.page'
import PupilLearnCheckPointPaege from './../pages/pupil.learn.checkpoint.page'
import PupilLearnSearch from './../pages/pupil.learn.search.page'
import PaymentPage from './../pages/payment.page'
//import InvoicePage from './../pages/payment.invoice.page'

export const AppContent = () => {
    const location = useLocation();
    const state = useContext(StateContext)
    useEffect( () => {
        console.group('INTO AppContent::STATECONTEXT')
        console.dir(state)
        console.groupEnd()
    })
    return (
        <Router>
            <Layout.Content
                style={{
                    margin: '8px 16px',
                    padding: '0 8px 16px',
                }}
            >
                <Switch>
                    <Route exact path={["/profile/create"]} component={PupilRegistration} />
                    <Route exact path={["/profile/search"]} component={PupilSearch} />
                    <Route exact path={["/profile/course/create"]} component={PupilLearnProfilePaege} />
                    <Route path={["/profile/course/create"]} 
                           render={() => {
                                        console.log(`location.hash ${location.hash}`)
                                        let optimizeUrl = String(location.hash).replace("#",'').replace("/profile/course/create?usercode=",'')
                                        const usercode = optimizeUrl;
                                        console.log(`Route /profile/course/create with parameter ${usercode}`)
                                        return usercode ? <PupilLearnProfilePaege usercode={usercode} /> : <Redirect to="/" />;
                                    }}  />
                    <Route path={["/profile"]} 
                           render={() => {
                                        console.log(`location.hash ${location.hash}`)
                                        let optimizeUrl = String(location.hash).replace("#",'').replace("/profile?codeNumber=",'')
                                        const codeNumber = optimizeUrl; //new URLSearchParams(optimizeUrl).get('codeNumber');
                                        console.log(`Route /profile with parameter ${codeNumber}`)
                                        return codeNumber ? <PersonProfilePage codeNumber={codeNumber} /> : <Redirect to="/" />;
                                    }}  />
                                    
                    <Route path={["/class/checkpoint"]} 
                           render={() => {
                                        console.log(`location.hash ${location.hash}`)
                                        let optimizeUrl = String(location.hash).replace("#",'').replace("/class/checkpoint?learnNo=",'')
                                        const learnNo = optimizeUrl === '/class/checkpoint' ? 'N/A': optimizeUrl ;
                                        console.log(`Route /class/checkpoint with parameter ${learnNo}`)
                                        return learnNo ? <PupilLearnCheckPointPaege learnNo={learnNo} /> : <Redirect to="/" />;
                                    }}  />
                    <Route exact path={["/class/search"]} component={PupilLearnSearch} />
                    <Route exact path={["/payment/create"]} component={PaymentPage} />
                    {/* <Route exact path={["/payment/receipt"]} component={InvoicePage} /> */}
                </Switch>
            </Layout.Content>
        </Router>
    )
}

// hash: "#/profile?codeNumber=23RSR65H"
// pathname: "/admin"
// search: ""
// state: undefined