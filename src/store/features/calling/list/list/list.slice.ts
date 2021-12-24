import {CallingModel, ParamsPaginatorWithFilterModel} from 'core/api';
import {FetchStatuses} from 'shared/types/fetch-statuses';
import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {DirectionSort, SortType} from 'shared/data/sort-items';
import {AxiosRequestConfig} from 'axios';
import {getCallings} from 'core/api/requests/calling';
import {DefaultAxiosError} from 'shared/types/base-response-error';

export interface CallingListState {
    callingList: CallingModel[],
    statuses: FetchStatuses,
    page: number,
    size: number,
    isLastPage: boolean,
}

const initialState: CallingListState = {
    callingList: [],
    statuses: {},
    page: 0,
    size: 10,
    isLastPage: false,
};

export const callingListSlice = createSlice({
    name: 'callingList',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.statuses = {isLoading: true};
        },
        setSuccess: (state) => {
            state.statuses = {isSuccess: true};
        },
        setError: (state, action: PayloadAction<string>) => {
            state.statuses = {isError: true, error: action.payload};
        },
        addCallings: (state, action: PayloadAction<CallingModel[]>) => {
            state.callingList = [...state.callingList, ...action.payload];
        },
        resetCallings: (state) => {
            state.callingList = [];
        },
        deleteCallingById: (state, action: PayloadAction<number | string>) => {
            state.callingList = state.callingList.filter(el => el.id !== action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setLastPage: (state, action: PayloadAction<boolean>) => {
            state.isLastPage = action.payload;
        },
        resetCallingStates: (state) => {
            state.callingList = [];
            state.statuses = {};
            state.page = 0;
            state.isLastPage = false;
            state.size = 10;
        },
    },
});

export const getCallingsByPage =
    (params: ParamsPaginatorWithFilterModel<SortType, DirectionSort>, otherConfig?: AxiosRequestConfig) =>
        (dispatch: Dispatch) => {
            dispatch(setLoading());
            getCallings(params, otherConfig)
                .then((res) => {
                    dispatch(addCallings(res.data.content));
                    if (res.data.last) {
                        dispatch(setLastPage(res.data.last));
                    }
                    dispatch(setPage(res.data.pageable.pageNumber));
                    dispatch(setSuccess());
                })
                .catch((err: DefaultAxiosError) => {
                    dispatch(setError(err.response?.data.message || 'Ошибка при полученни данных'));
                });
        };

export const {
    setLoading,
    resetCallingStates,
    addCallings,
    setSuccess,
    resetCallings,
    setLastPage,
    setPage,
    deleteCallingById,
    setError,
} = callingListSlice.actions;

export const callingListReducers = callingListSlice.reducer;
