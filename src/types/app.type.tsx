export type State = {
    user: User,
    data: Data
    isLoading?: boolean
    isLoggedIn?: boolean
    error?: string
    visible?: boolean
    collapsed?: boolean
}

export type User = {
    username: string
    password: string
    role: string
    grant_permission: string
    decline_permission: string
}

export type Data = {
    grabOrderId: string
    reportCancelId: bigint
    reportCancelFileName: string
    reportRunBy: string
}

interface SetFieldAction { 
    type: 'field', fieldName: string, payload: string 
}

interface SetLogInAction { 
    type: 'login' 
}

interface SetSuccessAction {
    type: 'success' ,role: string ,grant_permission: string
    // sitegroup: string ,channel: string , channel_email: string
} 

interface SetErrorAction {
    type: 'error', message: string
}

interface SetLogOutAction {
    type: 'logout'
}

interface SetVisibleAction {
    type: 'visible'
}

interface SetInVisibleAction {
    type: 'invisible'
}

interface SetCollapsedAction {
    type: 'collapsed'
}

export type AuthenticationAction = 
| SetFieldAction 
| SetLogInAction 
| SetSuccessAction 
| SetErrorAction 
| SetLogOutAction 
| SetVisibleAction 
| SetInVisibleAction 
| SetCollapsedAction