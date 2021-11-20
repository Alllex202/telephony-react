import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DirectionType, SortByType} from "../../../../core/api/requests";


export interface FilterState {
    name: string,
    sortBy: SortByType,
    direction: DirectionType,
}

const initialState: FilterState = {
    name: '',
    sortBy: 'CREATION_DATE',
    direction: 'DESC',
}

export const callersBasesFilterSlice = createSlice({
    name: 'callersBasesFilter',
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<FilterState>) => {
            state.name = action.payload.name;
            state.sortBy = action.payload.sortBy;
            state.direction = action.payload.direction;
        },
        resetFilter: (state) => {
            state.name = '';
            state.sortBy = 'CREATION_DATE';
            state.direction = 'DESC';
        }
    }
});

export const {changeFilter, resetFilter} = callersBasesFilterSlice.actions;

export const callersBasesFilterReducers = callersBasesFilterSlice.reducer;
