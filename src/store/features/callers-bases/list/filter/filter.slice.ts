import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortItem, sortItemsCallersBaseList} from 'shared/data/sort-items';


export interface FilterState extends SortItem {
    name: string,
}

const initialState: FilterState = {
    name: '',
    sortBy: sortItemsCallersBaseList[0].sortBy,
    direction: sortItemsCallersBaseList[0].direction,
    text: sortItemsCallersBaseList[0].text,
}

export const callersBasesFilterSlice = createSlice({
    name: 'callersBasesFilter',
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<FilterState>) => {
            state.name = action.payload.name;
            state.sortBy = action.payload.sortBy;
            state.direction = action.payload.direction;
            state.text = action.payload.text;
        },
        resetFilter: (state) => {
            state.name = '';
            state.sortBy = sortItemsCallersBaseList[0].sortBy;
            state.direction = sortItemsCallersBaseList[0].direction;
            state.text = sortItemsCallersBaseList[0].text;
        }
    }
});

export const {changeFilter, resetFilter} = callersBasesFilterSlice.actions;

export const callersBasesFilterReducers = callersBasesFilterSlice.reducer;
