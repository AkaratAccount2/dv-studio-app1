import React ,{useReducer} from 'react'
import './App.css'

import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom'

import { LandingPage } from './pages/landing.page'
import { NotFoundPage } from './pages/404.page'
import { UserNotFoundPage } from './pages/404.page.user.not.found'
import { ProtectedRoute } from './routes/protected.route'
import { AppLayout } from './components/app.layout'

import { initialState, AppProvider } from './provider/app.provider'
import reducer from './reducers/app.reducer'

//[removed]
//import { useImmerReducer } from 'use-immer'


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    // <div> Davinci studio </div>
    <AppProvider dispatch={dispatch} state={state}>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/user_not_found" component={UserNotFoundPage} />
            <ProtectedRoute exact path='/admin' component={AppLayout} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
    </AppProvider>
  )
}

export default App
