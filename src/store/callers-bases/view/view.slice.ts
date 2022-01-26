import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {
    CallersBaseDataModel,
    CallersBaseHeaderModel,
    CallingModel,
    getCallersBaseDataById,
    getCallersBaseHeaderById,
    getCallingsByCallersBaseId as _getCallingsByCallersBaseId,
    getVariablesTypes as _getVariablesTypes,
    ParamsPaginatorWithInvalidModel,
    putCallersBaseHeaderById,
    VariableTypeModel
} from 'core/api'
import {DefaultAxiosError, FetchStatuses, IdKey, PageSettings, RequestPageTypes} from 'shared/types'
import {handlerError} from 'shared/middleware'
import {RootState} from 'store/index'
import {enqueueSnackbar} from 'features/notifications'

type pageSettingsExtra = PageSettings & {onlyInvalid: boolean}

interface ViewState {
    common: {
        data: CallersBaseHeaderModel | null
        statuses: FetchStatuses
    }
    table: {
        data: CallersBaseDataModel[]
        statuses: FetchStatuses
        pageSettings: pageSettingsExtra
    }
    callings: {
        data: CallingModel[]
        statuses: FetchStatuses
    }
    variablesTypes: {
        data: VariableTypeModel[]
        statuses: FetchStatuses
    }
}

type ViewStateTypes = keyof ViewState

const initialState: ViewState = {
    common: {
        data: null,
        statuses: {}
    },
    table: {
        data: [],
        statuses: {},
        pageSettings: {page: 0, isLastPage: false, size: 50, onlyInvalid: false}
    },
    callings: {
        data: [],
        statuses: {}
    },
    variablesTypes: {
        data: [],
        statuses: {}
    }
}

export const callersBaseViewSlice = createSlice({
    name: 'callersBaseView',
    initialState,
    reducers: {
        updateTablePageSettings: (
            state,
            action: PayloadAction<
                Partial<Pick<pageSettingsExtra, 'page' | 'isLastPage' | 'onlyInvalid'>>
            >
        ) => {
            state.table.pageSettings = {...state.table.pageSettings, ...action.payload}
        },
        setVariables: (state, action: PayloadAction<VariableTypeModel[]>) => {
            state.variablesTypes.data = action.payload
        },
        setCommon: (state, action: PayloadAction<CallersBaseHeaderModel>) => {
            state.common.data = action.payload
        },
        setCallings: (state, action: PayloadAction<CallingModel[]>) => {
            state.callings.data = action.payload
        },
        addTableData: (state, action: PayloadAction<CallersBaseDataModel[]>) => {
            state.table.data.push(...action.payload)
        },
        setLoading: (state, action: PayloadAction<ViewStateTypes>) => {
            state[action.payload].statuses = {isLoading: true}
        },
        setSuccess: (state, action: PayloadAction<ViewStateTypes>) => {
            state[action.payload].statuses = {isSuccess: true}
        },
        setError: (state, action: PayloadAction<{error: string; type: ViewStateTypes}>) => {
            state[action.payload.type].statuses = {isError: true, error: action.payload.error}
        },
        resetTable: (state) => {
            state.table.data = []
            state.table.statuses = {}
            state.table.pageSettings = {
                page: 0,
                isLastPage: false,
                size: state.table.pageSettings.size,
                onlyInvalid: state.table.pageSettings.onlyInvalid
            }
        },
        resetCallersBaseViewState: (state) => {
            state.common.data = null
            state.common.statuses = {}

            state.table.data = []
            state.table.statuses = {}
            state.table.pageSettings = {
                page: 0,
                isLastPage: false,
                size: state.table.pageSettings.size,
                onlyInvalid: false
            }

            state.callings.data = []
            state.callings.statuses = {}
        }
    }
})

export const getVariablesTypes = () => (dispatch: Dispatch) => {
    dispatch(setLoading('variablesTypes'))
    _getVariablesTypes()
        .then((res) => {
            dispatch(setVariables(res.data))
            dispatch(setSuccess('variablesTypes'))
        })
        .catch(
            handlerError(dispatch, (err: DefaultAxiosError) => {
                dispatch(
                    setError({
                        error: err.response?.data.message || 'getVariablesTypes',
                        type: 'variablesTypes'
                    })
                )
            })
        )
}

export const getCallingsByCallersBaseId = (id: IdKey) => (dispatch: Dispatch) => {
    dispatch(setLoading('callings'))
    _getCallingsByCallersBaseId(id)
        .then((res) => {
            dispatch(setCallings(res.data))
            dispatch(setSuccess('callings'))
        })
        .catch(
            handlerError(dispatch, (err: DefaultAxiosError) => {
                dispatch(
                    setError({
                        error: err.response?.data.message || 'getCallingsByCallersBaseId',
                        type: 'callings'
                    })
                )
            })
        )
}

export const getCallersBaseCommonById = (id: IdKey) => (dispatch: Dispatch) => {
    dispatch(setLoading('common'))
    getCallersBaseHeaderById(id)
        .then((res) => {
            dispatch(setCommon(res.data))
            dispatch(setSuccess('common'))
        })
        .catch(
            handlerError(dispatch, (err: DefaultAxiosError) => {
                dispatch(
                    setError({
                        error: err.response?.data.message || 'getCallersBaseById',
                        type: 'common'
                    })
                )
            })
        )
}

export const getCallersBaseTableDataPage =
    (id: IdKey, type: RequestPageTypes) => (dispatch: Dispatch, getState: () => RootState) => {
        const {
            callersBaseView: {
                table: {
                    pageSettings: {page, size, onlyInvalid}
                }
            }
        } = getState()
        const params: ParamsPaginatorWithInvalidModel = {
            page: page + 1,
            size,
            onlyInvalid
        }

        if (type === RequestPageTypes.First) {
            params.page = 0
            dispatch(resetTable())
        }

        dispatch(setLoading('table'))
        getCallersBaseDataById(id, params)
            .then((res) => {
                dispatch(addTableData(res.data.content))
                dispatch(
                    updateTablePageSettings({
                        page: res.data.pageable.pageNumber,
                        isLastPage: res.data.last
                    })
                )
                dispatch(setSuccess('table'))
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    dispatch(
                        setError({
                            error: err.response?.data.message || 'getCallersBaseTableDataPage',
                            type: 'table'
                        })
                    )
                })
            )
    }

export const changeCallersBaseCommon =
    (data: CallersBaseHeaderModel) => (dispatch: Dispatch, getState: () => RootState) => {
        const {
            callersBaseView: {
                common: {data: oldData}
            }
        } = getState()

        dispatch(setLoading('common'))
        putCallersBaseHeaderById(data.id, data)
            .then((res) => {
                dispatch(setCommon(res.data))
                dispatch(setSuccess('common'))
                dispatch(enqueueSnackbar({message: 'Данные изменены', type: 'SUCCESS'}))
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    oldData && dispatch(setCommon(oldData))
                    dispatch(
                        setError({
                            error: err.response?.data.message || 'changeCallersBaseCommon',
                            type: 'common'
                        })
                    )
                })
            )
    }

export const {
    setLoading,
    setVariables,
    resetCallersBaseViewState,
    setCommon,
    addTableData,
    updateTablePageSettings,
    setError,
    resetTable,
    setCallings,
    setSuccess
} = callersBaseViewSlice.actions

export const callersBaseViewReducer = callersBaseViewSlice.reducer
