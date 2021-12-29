import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {OptionsObject, SnackbarKey, SnackbarMessage} from 'notistack'
import {getUniqueId} from 'shared/utils'

export interface Notification {
    message: SnackbarMessage
    options?: OptionsObject
    key?: string
    dismissed?: boolean
}

export interface NotificationsState {
    notifications: Notification[],
}

const initialState: NotificationsState = {
    notifications: []
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        enqueueSnackbar: (state, action: PayloadAction<Notification>) => {
            const notify = action.payload.options ? action.payload : {message: action.payload.message, options: {}}
            // @ts-ignore
            state.notifications.push({...notify, key: getUniqueId()})
        },
        closeSnackbar: (state, action: PayloadAction<SnackbarKey | undefined>) => {
            state.notifications = state.notifications.map(el => !action.payload || el.key === action.payload
                                                                ? {...el, dismissed: true}
                                                                : el)
        },
        removeSnackbar: (state, action: PayloadAction<SnackbarKey>) => {
            state.notifications = state.notifications.filter(el => el.key !== action.payload)
        }
    }
})

export const {removeSnackbar, enqueueSnackbar, closeSnackbar} = notificationSlice.actions

export const notificationReducers = notificationSlice.reducer
