import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SnackbarKey, SnackbarMessage} from 'notistack'
import {getUniqueId} from 'shared/utils'

export type NotificationType = 'DEFAULT' | 'ALERT' | 'ERROR' | 'SUCCESS'

export interface Notification {
    message: SnackbarMessage
    key?: string
    dismissed?: boolean
    type: NotificationType
}

export interface NotificationsState {
    notifications: Notification[]
    max: number
}

const initialState: NotificationsState = {
    notifications: [],
    max: 5
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        enqueueSnackbar: (state, action: PayloadAction<Notification>) => {
            state.notifications.push({...action.payload, key: getUniqueId()})
        },
        closeSnackbar: (state, action: PayloadAction<SnackbarKey | undefined>) => {
            state.notifications = state.notifications.map(el => ({
                ...el,
                dismissed: !action.payload || el.key === action.payload
            }))
        },
        removeSnackbar: (state, action: PayloadAction<SnackbarKey>) => {
            state.notifications = state.notifications.filter(el => el.key !== action.payload)
        }
    }
})

export const {removeSnackbar, enqueueSnackbar, closeSnackbar} = notificationSlice.actions

export const notificationReducers = notificationSlice.reducer
