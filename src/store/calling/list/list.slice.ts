import {
    CallingModel,
    CallingStatusTypes,
    getCallings,
    ParamsPaginatorWithFilterAndStatusModel
} from 'core/api'
import {DefaultAxiosError, FetchStatuses, PageSettings, RequestPageTypes} from 'shared/types'
import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {handlerError} from 'shared/middleware'
import {RootState} from 'store/index'

interface CallingListState {
    callingList: CallingModel[]
    statuses: FetchStatuses
    pageSettings: Required<PageSettings>
}

const initialState: Record<CallingStatusTypes, CallingListState> = {
    RUN: {
        callingList: [],
        statuses: {},
        pageSettings: {page: 0, isLastPage: false, size: 10, totalElements: 0}
    },
    SCHEDULED: {
        callingList: [],
        statuses: {},
        pageSettings: {page: 0, isLastPage: false, size: 10, totalElements: 0}
    },
    DONE: {
        callingList: [],
        statuses: {},
        pageSettings: {page: 0, isLastPage: false, size: 10, totalElements: 0}
    }
}

export const callingListSlice = createSlice({
    name: 'callingList',
    initialState,
    reducers: {
        updatePageSettings: (
            state,
            action: PayloadAction<{
                edited: Partial<Pick<PageSettings, 'isLastPage' | 'page' | 'totalElements'>>
                callingStatus: CallingStatusTypes
            }>
        ) => {
            state[action.payload.callingStatus].pageSettings = {
                ...state[action.payload.callingStatus].pageSettings,
                ...action.payload.edited
            }
        },
        setLoading: (state, action: PayloadAction<CallingStatusTypes>) => {
            state[action.payload].statuses = {isLoading: true}
        },
        setSuccess: (state, action: PayloadAction<CallingStatusTypes>) => {
            state[action.payload].statuses = {isSuccess: true}
        },
        setError: (
            state,
            action: PayloadAction<{error: string; callingStatus: CallingStatusTypes}>
        ) => {
            state[action.payload.callingStatus].statuses = {
                isError: true,
                error: action.payload.error
            }
        },
        addCallings: (
            state,
            action: PayloadAction<{data: CallingModel[]; callingStatus: CallingStatusTypes}>
        ) => {
            state[action.payload.callingStatus].callingList = [
                ...state[action.payload.callingStatus].callingList,
                ...action.payload.data
            ]
        },
        callingByIdMoveFromScheduledToRun: (state, action: PayloadAction<string | number>) => {
            state.RUN.callingList = [
                ...state.SCHEDULED.callingList.filter((e) => e.id === action.payload),
                ...state.RUN.callingList
            ]
            state.SCHEDULED.callingList = [
                ...state.SCHEDULED.callingList.filter((e) => e.id !== action.payload)
            ]
            state.RUN.pageSettings.totalElements++
            state.SCHEDULED.pageSettings.totalElements--
        },
        deleteCallingById: (
            state,
            action: PayloadAction<{id: number | string; callingStatus: CallingStatusTypes}>
        ) => {
            state[action.payload.callingStatus].callingList = state[
                action.payload.callingStatus
            ].callingList.filter((el) => el.id !== action.payload.id)
        },
        resetCallingStates: (state, action: PayloadAction<CallingStatusTypes>) => {
            state[action.payload].callingList = []
            state[action.payload].statuses = {}
            state[action.payload].pageSettings = {
                page: 0,
                isLastPage: false,
                size: state[action.payload].pageSettings.size,
                totalElements: 0
            }
        }
    }
})

export const getCallingsPage =
    (callingStatus: CallingStatusTypes, type: RequestPageTypes) =>
    (dispatch: Dispatch, getState: () => RootState) => {
        const {
            callingList,
            filter: {name, sortBy, direction}
        } = getState()
        const {
            pageSettings: {page, size}
        } = callingList[callingStatus]

        const params: ParamsPaginatorWithFilterAndStatusModel = {
            page: page + 1,
            size,
            name,
            sortBy,
            direction,
            status: callingStatus
        }

        if (type === RequestPageTypes.First) {
            params.page = 0
            dispatch(resetCallingStates(callingStatus))
        }

        dispatch(setLoading(callingStatus))
        getCallings(params)
            .then((res) => {
                dispatch(addCallings({data: res.data.content, callingStatus}))
                dispatch(
                    updatePageSettings({
                        edited: {
                            page: res.data.pageable.pageNumber,
                            isLastPage: res.data.last,
                            totalElements: res.data.totalElements
                        },
                        callingStatus
                    })
                )
                dispatch(setSuccess(callingStatus))
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    dispatch(
                        setError({
                            error: err.response?.data.message || 'getCallingsPage',
                            callingStatus
                        })
                    )
                })
            )
    }

// export const getCallingsByPage =
//     (
//         callingStatus: CallingStatusTypes,
//         params: ParamsPaginatorWithFilterAndStatusModel,
//         otherConfig?: AxiosRequestConfig
//     ) =>
//     (dispatch: Dispatch) => {
//         dispatch(setLoading(callingStatus))
//         getCallings(params, otherConfig)
//             .then((res) => {
//                 dispatch(addCallings({data: res.data.content, callingStatus}))
//                 if (res.data.last) {
//                     dispatch(setLastPage({isLast: res.data.last, callingStatus}))
//                 }
//                 dispatch(setPage({page: res.data.pageable.pageNumber, callingStatus}))
//                 dispatch(setTotalElements({totalElements: res.data.totalElements, callingStatus}))
//                 dispatch(setSuccess(callingStatus))
//             })
//             .catch(
//                 handlerError(dispatch, (err: DefaultAxiosError) => {
//                     dispatch(
//                         setError({
//                             error: err.response?.data.message || 'Ошибка при полученни данных',
//                             callingStatus
//                         })
//                     )
//                 })
//             )
//     }

export const {
    setLoading,
    resetCallingStates,
    addCallings,
    setSuccess,
    deleteCallingById,
    setError,
    callingByIdMoveFromScheduledToRun,
    updatePageSettings
} = callingListSlice.actions

export const callingListReducers = callingListSlice.reducer
