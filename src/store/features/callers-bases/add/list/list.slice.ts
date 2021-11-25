import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {CallersBaseHeaderModel, PaginatorModel} from "../../../../../core/api";
import {FetchStatuses} from "../../../../../shared/types/fetch-statuses";
import axios, {AxiosRequestConfig, CancelToken} from "axios";
import {apiRoutes} from "../../../../../core/api/routes";
import {DefaultAxiosError} from "../../../../../shared/types/base-response-error";
import {DirectionSort, ParamsPaginatorHeader, SortType} from "../../../../../core/api/requests";
import {RootState} from "../../../../index";

export interface CallersBaseState {
    callersBaseHeaders: CallersBaseHeaderModel[],
    error: string,
    statuses: FetchStatuses,
    page: number,
    size: number,
    isLastPage: boolean,
}

const initialState: CallersBaseState = {
    callersBaseHeaders: [],
    error: '',
    statuses: {isLoading: false, isError: false, isSuccess: false},
    page: 0,
    size: 1,
    isLastPage: false,
}

export const callersBaseHeadersSlice = createSlice({
    name: 'callersBases',
    initialState,
    reducers: {
        addCallersBases: (state, action: PayloadAction<CallersBaseHeaderModel[]>) => {
            state.callersBaseHeaders = [...state.callersBaseHeaders, ...action.payload];
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        resetCallersBases: (state) => {
            state.callersBaseHeaders = [];
        },
        deleteCallersBaseById: (state, action: PayloadAction<number | string>) => {
            state.callersBaseHeaders = state.callersBaseHeaders.filter(el => el.id !== action.payload);
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.statuses = {isError: true};
        },
        resetError: (state) => {
            state.error = '';
        },
        setLoading: (state) => {
            state.statuses = {isLoading: true};
        },
        setSuccess: (state) => {
            state.statuses = {isSuccess: true};
        },
        resetStatuses: (state) => {
            state.statuses = {isLoading: false, isError: false, isSuccess: false};
        },
        resetCallersBasesStates: (state) => {
            state.statuses = {isLoading: false, isError: false, isSuccess: false};
            state.error = '';
            state.callersBaseHeaders = [];
            state.page = 0;
            state.size = initialState.size;
            state.isLastPage = false;
        },
        setLastPage: (state, action: PayloadAction<boolean>) => {
            state.isLastPage = action.payload;
        },
    },
});

export const getCallersBasesByPage =
    (params: ParamsPaginatorHeader<SortType, DirectionSort>, cancelToken?: CancelToken, otherConfig?: AxiosRequestConfig) =>
        (dispatch: Dispatch) => {
            dispatch(setLoading());
            axios
                .get<PaginatorModel<CallersBaseHeaderModel>>(apiRoutes.callersBase.header(), {
                    ...otherConfig,
                    params,
                    cancelToken
                })
                .then((res) => {
                    dispatch(addCallersBases(res.data.content))
                    if (res.data.last) {
                        dispatch(setLastPage(res.data.last));
                    }
                    dispatch(setPage(res.data.pageable.pageNumber));
                    dispatch(setSuccess());
                })
                .catch((err: DefaultAxiosError) => {
                    dispatch(setError(err.response?.data.error || 'Необработанная ошибка'));
                });
        };


export const {
    addCallersBases,
    // resetCallersBases,
    // resetStatuses,
    // resetError,
    setError,
    deleteCallersBaseById,
    setSuccess,
    resetCallersBasesStates,
    setLoading,
    setLastPage,
    setPage,
} = callersBaseHeadersSlice.actions;

export const callersBaseHeadersReducers = callersBaseHeadersSlice.reducer;
