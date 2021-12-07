import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SortItem, sortItemsScenarioList} from 'shared/data/sort-items';

export interface FilterState extends SortItem {
    name: string,
}

const initialState: FilterState = {
    name: '',
    sortBy: sortItemsScenarioList[0].sortBy,
    direction: sortItemsScenarioList[0].direction,
    text: sortItemsScenarioList[0].text,
};

export const scenarioFilterSlice = createSlice({
    name: 'scenarioFilter',
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
            state.sortBy = sortItemsScenarioList[0].sortBy;
            state.direction = sortItemsScenarioList[0].direction;
            state.text = sortItemsScenarioList[0].text;
        }
    }
});

export const {changeFilter, resetFilter} = scenarioFilterSlice.actions;

export const scenarioFilterReducers = scenarioFilterSlice.reducer;
