import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortItem, sortItemsCallingList} from 'shared/data/sort-items';


export interface FilterState extends SortItem {
    name: string,
}

const initialState: FilterState = {
    name: '',
    sortBy: sortItemsCallingList[0].sortBy,
    direction: sortItemsCallingList[0].direction,
    text: sortItemsCallingList[0].text,
}

export const callingFilterSlice = createSlice({
    name: 'callingFilter',
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
            state.sortBy = sortItemsCallingList[0].sortBy;
            state.direction = sortItemsCallingList[0].direction;
            state.text = sortItemsCallingList[0].text;
        }
    }
});

export const {changeFilter, resetFilter} = callingFilterSlice.actions;

export const callingFilterReducers = callingFilterSlice.reducer;
