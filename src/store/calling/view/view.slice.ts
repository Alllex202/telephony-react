import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {
    CallingResultCommonModel,
    CallingResultPieChartModel,
    CallingResultTableBodyModel,
    CallingResultTableHeaderModel,
    DataChartModel,
    getCallingResultChart,
    getCallingResultCommon,
    getCallingResultPieChart,
    getCallingResultTableBody,
    getCallingResultTableHeader,
    getVariablesTypes,
    ParamsPaginatorModel,
    PieChartPartModel,
    VariableTypeModel
} from 'core/api'
import {FetchStatuses, IdKey, PageSettings, RequestPageTypes} from 'shared/types'
import {handlerError} from 'shared/middleware'
import {compare, getColor, getNumber} from 'shared/utils'
import {fakeChart} from 'shared/data'
import {fakePieChartCallingView} from 'shared/data/'
import {RootState} from 'store/index'

export interface ExtraPieChartPartModel extends PieChartPartModel {
    color: string
    number: number
}

interface ExtraCallingResultPieChartModel extends CallingResultPieChartModel {
    parts: ExtraPieChartPartModel[]
}

interface ViewState {
    common: {
        data: CallingResultCommonModel | null
        status: FetchStatuses
    }
    pieChart: {
        data: ExtraCallingResultPieChartModel | null
        status: FetchStatuses
    }
    chart: {
        data: DataChartModel[]
        status: FetchStatuses
    }
    tableHeader: {
        data: CallingResultTableHeaderModel | null
        status: FetchStatuses
    }
    tableBody: {
        data: CallingResultTableBodyModel[]
        status: FetchStatuses
        pageSettings: PageSettings
    }
    variables: {
        data: VariableTypeModel[]
        status: FetchStatuses
    }
}

type CallingResultTypes = keyof ViewState

const initialState: ViewState = {
    common: {
        data: null,
        status: {}
    },
    pieChart: {
        data: null,
        status: {}
    },
    chart: {
        data: [],
        status: {}
    },
    tableHeader: {
        data: null,
        status: {}
    },
    tableBody: {
        data: [],
        status: {},
        pageSettings: {page: 0, isLastPage: false, size: 30}
    },
    variables: {
        data: [],
        status: {}
    }
}

export const callingViewSlice = createSlice({
    name: 'callingViewSlice',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{type: CallingResultTypes}>) => {
            state[action.payload.type].status = {isLoading: true}
        },
        setSuccess: (state, action: PayloadAction<{type: CallingResultTypes}>) => {
            state[action.payload.type].status = {isSuccess: true}
        },
        setError: (state, action: PayloadAction<{error: string; type: CallingResultTypes}>) => {
            state[action.payload.type].status = {isError: true, error: action.payload.error}
        },
        setCommon: (state, action: PayloadAction<CallingResultCommonModel>) => {
            state.common.data = action.payload
        },
        setTableHeader: (state, action: PayloadAction<CallingResultTableHeaderModel>) => {
            state.tableHeader.data = action.payload
        },
        setTableBody: (state, action: PayloadAction<CallingResultTableBodyModel[]>) => {
            state.tableBody.data = [...state.tableBody.data, ...action.payload]
        },
        setVariables: (state, action: PayloadAction<VariableTypeModel[]>) => {
            state.variables.data = action.payload
        },
        setChart: (state, action: PayloadAction<DataChartModel[]>) => {
            state.chart.data = action.payload
        },
        setPieChart: (state, action: PayloadAction<CallingResultPieChartModel>) => {
            state.pieChart.data = {
                ...action.payload,
                parts: action.payload.parts
                    .map((el) => {
                        return {
                            ...el,
                            color: getColor(el.key),
                            number: getNumber(el.key)
                        }
                    })
                    .sort(compare)
            }
        },
        updateTableBodyPageSettings: (
            state,
            action: PayloadAction<Partial<Pick<PageSettings, 'page' | 'isLastPage'>>>
        ) => {
            state.tableBody.pageSettings = {...state.tableBody.pageSettings, ...action.payload}
        },
        resetCallingViewState: (state, action: PayloadAction<{type: CallingResultTypes}>) => {
            if (action.payload.type === 'variables') return

            if (action.payload.type === 'tableBody') {
                state.tableBody.pageSettings = {
                    size: state.tableBody.pageSettings.size,
                    page: 0,
                    isLastPage: false
                }
            }

            if (action.payload.type === 'chart' || action.payload.type === 'tableBody') {
                state[action.payload.type].data = []
            } else {
                state[action.payload.type].data = null
            }

            state[action.payload.type].status = {}
        }
    }
})

export const getVariables = () => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'variables'}))
    getVariablesTypes()
        .then((res) => {
            dispatch(setVariables(res.data))
            dispatch(setSuccess({type: 'variables'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({
                        error: err.response?.data.message ?? 'getVariables',
                        type: 'variables'
                    })
                )
            })
        )
}

export const getCallingResultTableHeaderById = (id: IdKey) => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'tableHeader'}))
    getCallingResultTableHeader(id)
        .then((res) => {
            dispatch(setTableHeader(res.data))
            dispatch(setSuccess({type: 'tableHeader'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({
                        error: err.response?.data.message ?? 'getCallingResultTableHeaderById',
                        type: 'tableHeader'
                    })
                )
            })
        )
}

export const getCallingResultTableBodyById =
    (id: IdKey, type: RequestPageTypes) => (dispatch: Dispatch, getState: () => RootState) => {
        const {
            callingView: {
                tableBody: {
                    pageSettings: {page, size}
                }
            }
        } = getState()

        const params: ParamsPaginatorModel = {
            page: page + 1,
            size
        }

        if (type === RequestPageTypes.First) {
            params.page = 0
            dispatch(resetCallingViewState({type: 'tableBody'}))
        }

        dispatch(setLoading({type: 'tableBody'}))
        getCallingResultTableBody(id, params)
            .then((res) => {
                dispatch(setTableBody(res.data.content))
                dispatch(
                    updateTableBodyPageSettings({
                        page: res.data.pageable.pageNumber,
                        isLastPage: res.data.last
                    })
                )
                dispatch(setSuccess({type: 'tableBody'}))
            })
            .catch(
                handlerError(dispatch, (err) => {
                    dispatch(
                        setError({
                            error: err.response?.data.message ?? 'getCallingResultTableBodyById',
                            type: 'tableBody'
                        })
                    )
                })
            )
    }

export const getCallingResultCommonById = (id: IdKey) => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'common'}))
    getCallingResultCommon(id)
        .then((res) => {
            dispatch(setCommon(res.data))
            dispatch(setSuccess({type: 'common'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({
                        error: err.response?.data.message ?? 'getCallingResultCommonById',
                        type: 'common'
                    })
                )
            })
        )
}

export const getCallingResultChartById = (id: IdKey) => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'chart'}))
    getCallingResultChart(id)
        .then((res) => {
            // todo фейковые данные убрать
            // dispatch(setChart(res.data))
            dispatch(setChart(fakeChart))
            dispatch(setSuccess({type: 'chart'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({
                        error: err.response?.data.message ?? 'getCallingResultChartById',
                        type: 'chart'
                    })
                )
            })
        )
}

export const getCallingResultPieChartById = (id: IdKey) => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'pieChart'}))
    getCallingResultPieChart(id)
        .then((res) => {
            // todo фейковые данные убрать
            // dispatch(setPieChart(res.data))
            dispatch(setPieChart(fakePieChartCallingView))
            dispatch(setSuccess({type: 'pieChart'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({
                        error: err.response?.data.message ?? 'getCallingResultPieChartById',
                        type: 'pieChart'
                    })
                )
            })
        )
}

export const {
    resetCallingViewState,
    setSuccess,
    setLoading,
    setError,
    setVariables,
    setPieChart,
    setTableBody,
    setTableHeader,
    updateTableBodyPageSettings,
    setCommon,
    setChart
} = callingViewSlice.actions

export const callingCreatingReducers = callingViewSlice.reducer
