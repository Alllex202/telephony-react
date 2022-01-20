import {AxiosError} from 'axios'

export type BaseAxiosError<T> = AxiosError<T>

export type BaseResponseError = {
    error: string
    message: string
    path: string
    status: number
    timestamp: number
}

export type DefaultAxiosError = BaseAxiosError<BaseResponseError>
