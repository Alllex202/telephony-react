import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {CallersBaseHeaderModel} from 'core/api'
import {FetchStatuses} from 'shared/types/fetch-statuses'
import {AxiosRequestConfig} from 'axios'
import {DefaultAxiosError} from 'shared/types/base-response-error'
import {DirectionSort, SortType} from 'shared/data/sort-items'
import {ParamsPaginatorWithFilterModel} from 'core/api/models'
import {getCallersBasesHeader} from 'core/api/requests'
import {handlerError} from 'shared/middleware'

interface CallersBaseState {
    callersBaseList: CallersBaseHeaderModel[]
    error: string
    statuses: FetchStatuses
    page: number
    size: number
    isLastPage: boolean
}

const initialState: CallersBaseState = {
    callersBaseList: [],
    error: '',
    statuses: {isLoading: false, isError: false, isSuccess: false},
    page: 0,
    size: 10,
    isLastPage: false
}

export const callersBaseListSlice = createSlice({
    name: 'callersBases',
    initialState,
    reducers: {
        addCallersBases: (state, action: PayloadAction<CallersBaseHeaderModel[]>) => {
            state.callersBaseList = [...state.callersBaseList, ...action.payload]
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        resetCallersBases: (state) => {
            state.callersBaseList = []
        },
        deleteCallersBaseById: (state, action: PayloadAction<number | string>) => {
            state.callersBaseList = state.callersBaseList.filter((el) => el.id !== action.payload)
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.statuses = {isError: true}
        },
        resetError: (state) => {
            state.error = ''
        },
        setLoading: (state) => {
            state.statuses = {isLoading: true}
        },
        setSuccess: (state) => {
            state.statuses = {isSuccess: true}
        },
        resetStatuses: (state) => {
            state.statuses = {isLoading: false, isError: false, isSuccess: false}
        },
        resetCallersBasesStates: (state) => {
            state.statuses = {isLoading: false, isError: false, isSuccess: false}
            state.error = ''
            state.callersBaseList = []
            state.page = 0
            state.size = initialState.size
            state.isLastPage = false
        },
        setLastPage: (state, action: PayloadAction<boolean>) => {
            state.isLastPage = action.payload
        }
    }
})

export const getCallersBasesByPage =
    (
        params: ParamsPaginatorWithFilterModel<SortType, DirectionSort>,
        otherConfig?: AxiosRequestConfig
    ) =>
    (dispatch: Dispatch) => {
        dispatch(setLoading())
        getCallersBasesHeader(params, otherConfig)
            .then((res) => {
                dispatch(addCallersBases(res.data.content))
                if (res.data.last) {
                    dispatch(setLastPage(res.data.last))
                }
                dispatch(setPage(res.data.pageable.pageNumber))
                dispatch(setSuccess())
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    dispatch(setError(err.response?.data.error || 'Необработанная ошибка'))
                })
            )
    }

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
    setPage
} = callersBaseListSlice.actions

export const callersBaseListReducers = callersBaseListSlice.reducer
