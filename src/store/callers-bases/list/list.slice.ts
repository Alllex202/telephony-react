import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {
    CallersBaseHeaderModel,
    getCallersBasesHeader,
    ParamsPaginatorWithFilterModel
} from 'core/api'
import {DirectionSort, SortType} from 'shared/data'
import {handlerError} from 'shared/middleware'
import {DefaultAxiosError, FetchStatuses, PageSettings, RequestPageTypes} from 'shared/types'
import {RootState} from 'store/index'
import {IdKey} from 'shared/types/id-key'

interface CallersBaseState {
    callersBaseList: CallersBaseHeaderModel[]
    statuses: FetchStatuses
    pageSettings: PageSettings
}

const initialState: CallersBaseState = {
    callersBaseList: [],
    statuses: {},
    pageSettings: {page: 0, isLastPage: false, size: 10}
}

export const callersBaseListSlice = createSlice({
    name: 'callersBases',
    initialState,
    reducers: {
        updatePageSettings: (
            state,
            action: PayloadAction<Partial<Pick<PageSettings, 'isLastPage' | 'page'>>>
        ) => {
            state.pageSettings = {...state.pageSettings, ...action.payload}
        },
        setError: (state, action: PayloadAction<string>) => {
            state.statuses = {isError: true, error: action.payload}
        },
        setLoading: (state) => {
            state.statuses = {isLoading: true}
        },
        setSuccess: (state) => {
            state.statuses = {isSuccess: true}
        },
        addCallersBases: (state, action: PayloadAction<CallersBaseHeaderModel[]>) => {
            state.callersBaseList = [...state.callersBaseList, ...action.payload]
        },
        deleteCallersBaseById: (state, action: PayloadAction<IdKey>) => {
            state.callersBaseList = state.callersBaseList.filter((el) => el.id !== action.payload)
        },
        resetCallersBasesStates: (state) => {
            state.statuses = {}
            state.callersBaseList = []
            state.pageSettings = {page: 0, isLastPage: false, size: state.pageSettings.size}
        }
    }
})

export const getCallersBases =
    (type: RequestPageTypes) => (dispatch: Dispatch, getState: () => RootState) => {
        const {
            callersBaseList: {
                pageSettings: {page, size}
            },
            filter: {name, sortBy, direction}
        } = getState()

        const params: ParamsPaginatorWithFilterModel<SortType, DirectionSort> = {
            page: page + 1,
            size,
            name,
            sortBy,
            direction
        }

        if (type === RequestPageTypes.First) {
            params.page = 0
            dispatch(resetCallersBasesStates())
        }

        dispatch(setLoading())
        getCallersBasesHeader(params)
            .then((res) => {
                dispatch(addCallersBases(res.data.content))
                dispatch(
                    updatePageSettings({
                        isLastPage: res.data.last,
                        page: res.data.pageable.pageNumber
                    })
                )
                dispatch(setSuccess())
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    dispatch(setError(err.response?.data.error || 'getCallersBasesPage'))
                })
            )
    }

export const {
    addCallersBases,
    setError,
    deleteCallersBaseById,
    setSuccess,
    resetCallersBasesStates,
    setLoading,
    updatePageSettings
} = callersBaseListSlice.actions

export const callersBaseListReducers = callersBaseListSlice.reducer
