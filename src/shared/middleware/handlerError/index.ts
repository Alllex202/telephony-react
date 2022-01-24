import {DefaultAxiosError} from 'shared/types/base-response-error'
import {Dispatch} from '@reduxjs/toolkit'
import {enqueueSnackbar} from 'features/notifications/store'

type handlersKeys =
    | 'Network Error'
    | 'Universal'
    | 'Universal Server'
    | 400
    | 401
    | 403
    | 404
    | 405
    | 408
    | 500
    | 501
    | 502

const handlers: Record<handlersKeys, (dispatch: Dispatch, err: DefaultAxiosError) => void> = {
    Universal: (dispatch) => {
        dispatch(enqueueSnackbar({type: 'ERROR', message: 'Неожиданная ошибка'}))
    },

    'Universal Server': (dispatch) => {
        dispatch(
            enqueueSnackbar({
                type: 'ERROR',
                message: 'Необработанная ошибка'
            })
        )
    },

    'Network Error': (dispatch) => {
        dispatch(
            enqueueSnackbar({
                type: 'ERROR',
                message: 'Проверте соединение с Интернетом и попробуйте обновить страницу'
            })
        )
    },

    // Bad Request
    400: (dispatch, err) => {
        dispatch(enqueueSnackbar({type: 'ERROR', message: err.response?.data.message}))
    },

    // Unauthorized
    401: (dispatch) => {
        dispatch(enqueueSnackbar({type: 'ERROR', message: 'Необходимо авторизоваться'}))
    },

    // Forbidden
    403: (dispatch) => {
        dispatch(enqueueSnackbar({type: 'ERROR', message: 'Доступ запрещен'}))
    },

    // Not Found
    404: (dispatch) => {
        dispatch(enqueueSnackbar({type: 'ERROR', message: 'Не найдено'}))
    },

    // Method Not Allowed
    405: (dispatch) => {
        dispatch(enqueueSnackbar({type: 'ERROR', message: 'Метод не поддерживается'}))
    },

    // Request Timeout
    408: (dispatch) => {
        dispatch(
            enqueueSnackbar({type: 'ERROR', message: 'Истекло время ожидания. Попробуйте позже'})
        )
    },

    // Internal Server Error
    500: (dispatch) => {
        dispatch(
            enqueueSnackbar({
                type: 'ERROR',
                message: 'Произошла ошибка на сервере. Попробуйте позднее'
            })
        )
    },

    // Not Implemented
    501: (dispatch) => {
        dispatch(enqueueSnackbar({type: 'ERROR', message: 'Сервер не реализован'}))
    },

    // Bad Gateway
    502: (dispatch) => {
        dispatch(enqueueSnackbar({type: 'ERROR', message: 'Плохой, ошибочный шлюз'}))
    }
}

export const handlerError =
    (dispatch: Dispatch, callback?: (err: DefaultAxiosError) => void) =>
    (err: DefaultAxiosError) => {
        if (err.isAxiosError) {
            const handler =
                handlers[err.message as handlersKeys] ??
                (err.response?.status && handlers[err.response?.status as handlersKeys]) ??
                handlers['Universal Server']

            handler(dispatch, err)
        } else {
            handlers['Universal'](dispatch, err)
        }

        callback && callback(err)
    }
