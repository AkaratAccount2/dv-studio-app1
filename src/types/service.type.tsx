interface ServiceInit {
    status: 'init'
}

interface ServiceLoading {
    status: 'loading'
    payload?: undefined
}

interface ServiceLoaded<T> {
    status: 'loaded'
    payload: T
}

interface ServiceError {
    status: 'error'
    payload?: undefined
    error: Error
}

export type Service<T> =
| ServiceInit
| ServiceLoading
| ServiceLoaded<T>
| ServiceError