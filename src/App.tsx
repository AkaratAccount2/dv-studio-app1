import React from 'react'
import './App.css'

import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom'

// import { ProtectedRoute } from './routes/protected.route'
// import { LandingPage } from './pages/landing.page'
// import { NotFoundPage } from './pages/404.page'

import { initialState, AppProvider } from './provider/app.provider'
import { useImmerReducer } from 'use-immer'
import reducer from './reducers/app.reducer'
// import { AppLayout } from './components/app.layout'

function App() {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  return (
    <div> Davinci studio </div>
    // <AppProvider dispatch={dispatch} state={state}>
    //     <Router>
    //       <Switch>
    //         <Route exact path="/" component={LandingPage} />
    //         <ProtectedRoute exact path='/admin' component={AppLayout} />
    //         <Route component={NotFoundPage} />
    //       </Switch>
    //     </Router>
    // </AppProvider>
  )
}

export default App
