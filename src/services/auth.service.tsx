
import { User } from '../types/app.type'
import getUrl from '../common/helpers'

export const Auth = {
    isAuthenticated: false,
    //isAuthenticated: true,
    login(callback: () => void) {
        this.isAuthenticated = true
        callback()
    },
    logout(callback: () => void) : void {
        this.isAuthenticated = false
        callback()
    }  
}

export async function authen(user: User) {
    const response = await fetch(getUrl('/v1/authen'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: user.username,
            password: user.password
        })
    })
    const json = await response.json()
    //return json.message
    return json
}