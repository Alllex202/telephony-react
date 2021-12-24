import {configureStore} from '@reduxjs/toolkit';
import callersBaseList from './features/callers-bases/list/list';
import callersBasesFilter from './features/callers-bases/list/filter';
import callersBaseView from './features/callers-bases/view';
import scenarioFilter from './features/scenario/list/filter';
import scenarioList from './features/scenario/list/list';
import scenarioView from './features/scenario/view';
import callingFilter from './features/calling/list/filter'
import callingList from './features/calling/list/list'
import callingCreating from './features/calling/creating'

export const store = configureStore({
    reducer: {
        callersBaseList,
        callersBasesFilter,
        callersBaseView,
        scenarioFilter,
        scenarioList,
        scenarioView,
        callingFilter,
        callingList,
        callingCreating,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
