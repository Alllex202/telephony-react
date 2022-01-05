import {configureStore} from '@reduxjs/toolkit'
import filter from './features/filter'
import callersBaseList from 'store/features/callers-bases/list'
import callersBaseView from './features/callers-bases/view'
import scenarioList from 'store/features/scenario/list'
import scenarioView from './features/scenario/view'
import callingList from 'store/features/calling/list'
import callingCreating from './features/calling/creating'
import callingView from './features/calling/view'
import notifications from './features/notifications'

export const store = configureStore({
    reducer: {
        callersBaseList,
        callersBaseView,
        scenarioList,
        scenarioView,
        callingList,
        callingCreating,
        callingView,
        filter,
        notifications
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
