import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Auth } from '../services/auth.service'

type Props = {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

export const ProtectedRoute = ({component: Component, ...rest} : Props) => {
    return (
        <Route
        {...rest}
        render={props => {
                if (Auth.isAuthenticated) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            } 
        }/>
    )
}