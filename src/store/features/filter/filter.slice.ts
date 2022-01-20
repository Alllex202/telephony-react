import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SortItem, sortItems} from 'shared/data/sort-items'

export interface FilterState extends SortItem {
    name: string
}

const initialState: FilterState = {
    name: '',
    sortBy: sortItems[0].sortBy,
    direction: sortItems[0].direction,
    text: sortItems[0].text
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<FilterState>) => {
            state.name = action.payload.name
            state.sortBy = action.payload.sortBy
            state.direction = action.payload.direction
            state.text = action.payload.text
        },
        resetFilter: (state) => {
            state.name = ''
            state.sortBy = sortItems[0].sortBy
            state.direction = sortItems[0].direction
            state.text = sortItems[0].text
        }
    }
})

export const {changeFilter, resetFilter} = filterSlice.actions

export const filterReducers = filterSlice.reducer
