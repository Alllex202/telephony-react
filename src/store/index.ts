import { configureStore } from '@reduxjs/toolkit';
import callersBaseHeaders from './features/callers-bases/list/list';
import callersBasesFilter from './features/callers-bases/list/filter';
import callersBaseView from './features/callers-bases/view/';

export const store = configureStore({
    reducer: {
        callersBaseHeaders,
        callersBasesFilter,
        callersBaseView,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
