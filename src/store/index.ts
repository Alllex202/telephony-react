import {configureStore} from '@reduxjs/toolkit'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {history} from 'routing/browser-history'
import filter from './filter'
import callersBaseList from 'store/callers-bases/list'
import callersBaseView from './callers-bases/view'
import scenarioList from 'store/scenario/list'
import scenarioView from './scenario/view'
import callingList from 'store/calling/list'
import callingCreating from './calling/creating'
import callingView from './calling/view'
import notifications from 'features/notifications/store'
import stats from './stats'

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
        notifications,
        stats,
        router: connectRouter(history) as any // todo Что-то с типами роутера
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
