import { AuthenticationAction, State } from '../types/app.type'

export default function reducer(draftState: State, action: AuthenticationAction): State {
    switch (action.type) {
        case 'field':
            if (action.fieldName === 'username') {
                draftState.user.username = action.payload
            } else if (action.fieldName === 'password') {
                draftState.user.password = action.payload
            } else if (action.fieldName === 'grabOrderId') {
                draftState.data.grabOrderId = action.payload
            } else if( action.fieldName === 'reportCancelId'){
                draftState.data.reportCancelId = BigInt(action.payload)
            } else if( action.fieldName === 'reportCancelFileName'){
                draftState.data.reportCancelFileName = action.payload
            } else if( action.fieldName === 'reportRunBy'){
                draftState.data.reportRunBy = action.payload
            }
            return draftState
        case 'login':
            draftState.error = ''
            draftState.isLoading = true
            return draftState
        case 'success':
            draftState.isLoggedIn = true
            draftState.isLoading = false
            draftState.user.role = action.role
            draftState.user.sitegroup = action.sitegroup
            draftState.user.channel = action.channel
            draftState.user.channel_email = action.channel_email
            return draftState
        case 'error':
            draftState.error = action.message
            draftState.isLoggedIn = false
            draftState.isLoading = false
            return draftState
        case 'logout':
            draftState.isLoggedIn = false
            draftState.user.username = ''
            draftState.user.password = ''
            return draftState
        case 'visible':
            draftState.visible = !draftState.visible
            return draftState
        case 'invisible':
            draftState.visible = false
            return draftState
        case 'collapsed':
            draftState.collapsed = !draftState.collapsed
            return draftState
        default:
            return draftState
    }
}