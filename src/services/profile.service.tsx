import { useEffect, useState } from 'react'
import getUrl from '../common/helpers'
import { Service } from '../types/service.type'

// Service<GrabOrderResponse>
// export function useProfileUserCode(usercode: string) {
//     const [result, setResult] = useState<Service<any>>({
//         status: 'loading'
//     })
    
//     useEffect(() => {
//         if (usercode) {
//             fetch(getUrl(`/v1/profile/${usercode}`))
//             .then(response => response.json())
//             .then(response => response.results)
//             .then(response => setResult({ status: 'loaded', payload: response }))
//             .catch(error => setResult({ status: 'error', error: error}))
//         }
//     }, [usercode])

//     return result
// }


/*** Non React hook (useXXXX by use if reserve word of using React hook) */
export async function getProfileUserCode(usercode: string){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'cache-control' : 'no-cache'}
    };
    const host = process.env.REACT_APP_SERVER_HOST || ''
    const route_path = process.env.REACT_APP_CONTEXT_PATH || ''

    try {
        const response = await fetch(host+route_path+ `/v1/profile/${usercode}`, requestOptions)
        const data = await response.json()
        if (!response.ok) {
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
        return data.results
    } catch (error_1) {
        console.error('There was an error!', error_1)
    }
}

export async function searchProfile(formValues: any){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'cache-control' : 'no-cache'},
        body: JSON.stringify(formValues)
    };
    const host = process.env.REACT_APP_SERVER_HOST || ''
    const route_path = process.env.REACT_APP_CONTEXT_PATH || ''

    try {
        const response = await fetch(host+route_path+ `/v1/profile/search`, requestOptions)
        const data = await response.json()
        if (!response.ok) {
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
        return data.results
    } catch (error_1) {
        console.error('There was an error!', error_1)
    }
}

export async function saveNewProfile(formValues: any){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'cache-control' : 'no-cache'},
        body: JSON.stringify(formValues)
    };
    const host = process.env.REACT_APP_SERVER_HOST || ''
    const route_path = process.env.REACT_APP_CONTEXT_PATH || ''

    try {
        const response = await fetch(host+route_path+ `/v1/profile/create`, requestOptions)
        const data = await response.json()
        if (!response.ok) {
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
        return data.results
    } catch (error_1) {
        console.error('There was an error!', error_1)
    }
}

export async function getStudentType(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'cache-control' : 'no-cache'}
    };
    const host = process.env.REACT_APP_SERVER_HOST || ''
    const route_path = process.env.REACT_APP_CONTEXT_PATH || ''

    try {
        const response = await fetch(host+route_path+ `/v1/student_type`, requestOptions)
        const data = await response.json()
        if (!response.ok) {
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
        return data
    } catch (error_1) {
        console.error('There was an error!', error_1)
    }
}

//################# LEARN PROFILE ######################
export async function saveNewCourse(formValues: any){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'cache-control' : 'no-cache'},
        body: JSON.stringify(formValues)
    };
    const host = process.env.REACT_APP_SERVER_HOST || ''
    const route_path = process.env.REACT_APP_CONTEXT_PATH || ''

    try {
        const response = await fetch(host+route_path+ `/v1/profile/learn/create`, requestOptions)
        const data = await response.json()
        if (!response.ok) {
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
        return data.results
    } catch (error_1) {
        console.error('There was an error!', error_1)
    }
}

export async function getProfilelearn(learnNo: string){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'cache-control' : 'no-cache'}
    };
    const host = process.env.REACT_APP_SERVER_HOST || ''
    const route_path = process.env.REACT_APP_CONTEXT_PATH || ''

    try {
        const response = await fetch(host+route_path+ `/v1/profile/learn/${learnNo}`, requestOptions)
        const data = await response.json()
        if (!response.ok) {
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
        return data.results
    } catch (error_1) {
        console.error('There was an error!', error_1)
    }
}

export async function getProfileAlllearn(usercode: string){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'cache-control' : 'no-cache'}
    };
    const host = process.env.REACT_APP_SERVER_HOST || ''
    const route_path = process.env.REACT_APP_CONTEXT_PATH || ''

    try {
        const response = await fetch(host+route_path+ `/v1/profile/all/learn/${usercode}`, requestOptions)
        const data = await response.json()
        if (!response.ok) {
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
        return data.results
    } catch (error_1) {
        console.error('There was an error!', error_1)
    }
}

export async function searchCourse(formValues: any){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'cache-control' : 'no-cache'},
        body: JSON.stringify(formValues)
    };
    const host = process.env.REACT_APP_SERVER_HOST || ''
    const route_path = process.env.REACT_APP_CONTEXT_PATH || ''

    try {
        const response = await fetch(host+route_path+ `/v1/profile/learn/search`, requestOptions)
        const data = await response.json()
        if (!response.ok) {
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
        return data.results
    } catch (error_1) {
        console.error('There was an error!', error_1)
    }
}