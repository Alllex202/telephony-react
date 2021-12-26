import {configureStore} from '@reduxjs/toolkit';
import filter from './features/filter';
import callersBaseList from './features/callers-bases/list/list';
import callersBaseView from './features/callers-bases/view';
import scenarioList from './features/scenario/list/list';
import scenarioView from './features/scenario/view';
import callingList from './features/calling/list/list';
import callingCreating from './features/calling/creating';

export const store = configureStore({
    reducer: {
        callersBaseList,
        callersBaseView,
        scenarioList,
        scenarioView,
        callingList,
        callingCreating,
        filter,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
