import {CallingModel, CallingStatuses, ParamsPaginatorWithFilterAndStatusModel} from 'core/api'
import {FetchStatuses} from 'shared/types/fetch-statuses'
import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {AxiosRequestConfig} from 'axios'
import {getCallings} from 'core/api/requests/calling'
import {DefaultAxiosError} from 'shared/types/base-response-error'

export interface CallingListState {
    callingList: CallingModel[],
    statuses: FetchStatuses,
    page: number,
    size: number,
    isLastPage: boolean,
}

const initialState: Record<CallingStatuses, CallingListState> = {
    RUN: {
        callingList: [],
        statuses: {},
        isLastPage: false,
        size: 10,
        page: 0
    },
    SCHEDULED: {
        callingList: [],
        statuses: {},
        isLastPage: false,
        size: 10,
        page: 0
    },
    DONE: {
        callingList: [],
        statuses: {},
        isLastPage: false,
        size: 10,
        page: 0
    }
}

export const callingListSlice = createSlice({
    name: 'callingList',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<CallingStatuses>) => {
            state[action.payload].statuses = {isLoading: true}
        },
        setSuccess: (state, action: PayloadAction<CallingStatuses>) => {
            state[action.payload].statuses = {isSuccess: true}
        },
        setError: (state, action: PayloadAction<{ error: string, callingStatus: CallingStatuses }>) => {
            state[action.payload.callingStatus].statuses = {isError: true, error: action.payload.error}
        },
        addCallings: (state, action: PayloadAction<{ data: CallingModel[], callingStatus: CallingStatuses }>) => {
            state[action.payload.callingStatus].callingList = [
                ...state[action.payload.callingStatus].callingList,
                ...action.payload.data
            ]
        },
        // resetCallings: (state) => {
        //     state.callingList = [];
        // },
        deleteCallingById: (state, action: PayloadAction<{ id: number | string, callingStatus: CallingStatuses }>) => {
            state[action.payload.callingStatus].callingList =
                state[action.payload.callingStatus].callingList.filter(el => el.id !== action.payload.id)
        },
        setPage: (state, action: PayloadAction<{ page: number, callingStatus: CallingStatuses }>) => {
            state[action.payload.callingStatus].page = action.payload.page
        },
        setLastPage: (state, action: PayloadAction<{ isLast: boolean, callingStatus: CallingStatuses }>) => {
            state[action.payload.callingStatus].isLastPage = action.payload.isLast
        },
        resetCallingStates: (state) => {
            state.RUN.callingList = []
            state.RUN.statuses = {}
            state.RUN.page = 0
            state.RUN.isLastPage = false
            state.RUN.size = 10

            state.SCHEDULED.callingList = []
            state.SCHEDULED.statuses = {}
            state.SCHEDULED.page = 0
            state.SCHEDULED.isLastPage = false
            state.SCHEDULED.size = 10

            state.DONE.callingList = []
            state.DONE.statuses = {}
            state.DONE.page = 0
            state.DONE.isLastPage = false
            state.DONE.size = 10
        }
    }
})

export const getCallingsByPage =
    (callingStatus: CallingStatuses, params: ParamsPaginatorWithFilterAndStatusModel, otherConfig?: AxiosRequestConfig) =>
        (dispatch: Dispatch) => {
            dispatch(setLoading(callingStatus))
            getCallings(params, otherConfig)
                .then((res) => {
                    dispatch(addCallings({data: res.data.content, callingStatus}))
                    if (res.data.last) {
                        dispatch(setLastPage({isLast: res.data.last, callingStatus}))
                    }
                    dispatch(setPage({page: res.data.pageable.pageNumber, callingStatus}))
                    dispatch(setSuccess(callingStatus))
                })
                .catch((err: DefaultAxiosError) => {
                    dispatch(setError({
                        error: err.response?.data.message || 'Ошибка при полученни данных',
                        callingStatus
                    }))
                })
        }

export const {
    setLoading,
    resetCallingStates,
    addCallings,
    setSuccess,
    setLastPage,
    setPage,
    deleteCallingById,
    setError
} = callingListSlice.actions

export const callingListReducers = callingListSlice.reducer
