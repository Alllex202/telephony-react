import { configureStore } from '@reduxjs/toolkit';
import callersBaseHeaders from './features/callers-bases/list';
import callersBasesFilter from './features/callers-bases/filter';

export const store = configureStore({
    reducer: {
        callersBaseHeaders,
        callersBasesFilter,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
