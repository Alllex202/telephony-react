import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {
    CallingResultCommonModel,
    CallingResultPieChartModel,
    CallingResultTableBodyModel,
    CallingResultTableHeaderModel,
    DataChartModel,
    ParamsPaginatorModel,
    PieChartPartModel,
    VariableTypeModel
} from 'core/api'
import {FetchStatuses} from 'shared/types/fetch-statuses'
import {
    getCallingResultChart,
    getCallingResultCommon,
    getCallingResultPieChart,
    getCallingResultTableBody,
    getCallingResultTableHeader,
    getVariablesTypes
} from 'core/api/requests'
import {handlerError} from 'shared/middleware'
import {compare, getColor, getNumber} from 'shared/utils'
import {fakeChart} from 'shared/data/fake/fake-data-line-chart'
import {fakePieChart} from 'shared/data/fake/fake-pie-chart-calling-view'

type CallingResultTypes =
    | 'common'
    | 'pieChart'
    | 'chart'
    | 'tableHeader'
    | 'tableBody'
    | 'variables'

export interface ExtraPieChartPartModel extends PieChartPartModel {
    color: string
    number: number
}

interface ExtraCallingResultPieChartModel extends CallingResultPieChartModel {
    parts: ExtraPieChartPartModel[]
}

interface ViewState {
    common: {
        result: CallingResultCommonModel | null
        status: FetchStatuses
    }
    pieChart: {
        result: ExtraCallingResultPieChartModel | null
        status: FetchStatuses
    }
    chart: {
        result: DataChartModel[] | null
        status: FetchStatuses
    }
    tableHeader: {
        result: CallingResultTableHeaderModel | null
        status: FetchStatuses
    }
    tableBody: {
        result: CallingResultTableBodyModel[]
        status: FetchStatuses
        page: number
        size: number
        isLastPage: boolean
    }
    variables: {
        result: VariableTypeModel[] | null
        status: FetchStatuses
    }
}

const initialState: ViewState = {
    common: {
        result: null,
        status: {}
    },
    pieChart: {
        result: null,
        status: {}
    },
    chart: {
        result: null,
        status: {}
    },
    tableHeader: {
        result: null,
        status: {}
    },
    tableBody: {
        result: [],
        status: {},
        isLastPage: false,
        size: 50,
        page: 0
    },
    variables: {
        result: null,
        status: {}
    }
}

const callingViewSlice = createSlice({
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
        setCommonResult: (state, action: PayloadAction<CallingResultCommonModel>) => {
            state.common.result = action.payload
        },
        setTableHeaderResult: (state, action: PayloadAction<CallingResultTableHeaderModel>) => {
            state.tableHeader.result = action.payload
        },
        setTableBodyResult: (state, action: PayloadAction<CallingResultTableBodyModel[]>) => {
            state.tableBody.result = [...state.tableBody.result, ...action.payload]
        },
        setVariables: (state, action: PayloadAction<VariableTypeModel[]>) => {
            state.variables.result = action.payload
        },
        setChartResult: (state, action: PayloadAction<DataChartModel[]>) => {
            state.chart.result = action.payload
        },
        setPieChartResult: (state, action: PayloadAction<CallingResultPieChartModel>) => {
            state.pieChart.result = {
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
        setPage: (state, action: PayloadAction<number>) => {
            state.tableBody.page = action.payload
        },
        setIsLastPage: (state, action: PayloadAction<boolean>) => {
            state.tableBody.isLastPage = action.payload
        },
        resetState: (state) => {
            state.common.result = null
            state.common.status = {}

            state.pieChart.result = null
            state.pieChart.status = {}

            state.chart.result = null
            state.chart.status = {}

            state.tableHeader.result = null
            state.tableHeader.status = {}

            state.tableBody.result = []
            state.tableBody.status = {}
            state.tableBody.page = 0
            state.tableBody.isLastPage = false
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
                        error: err.response?.data.message ?? 'Непредусмотренная ошибка',
                        type: 'variables'
                    })
                )
            })
        )
}

export const getCallingResultTableHeaderById = (id: number | string) => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'tableHeader'}))
    getCallingResultTableHeader(id)
        .then((res) => {
            dispatch(setTableHeaderResult(res.data))
            dispatch(setSuccess({type: 'tableHeader'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({
                        error: err.response?.data.message ?? 'Непредусмотренная ошибка',
                        type: 'tableHeader'
                    })
                )
            })
        )
}

export const getCallingResultTableBodyById =
    (id: number | string, params: ParamsPaginatorModel) => (dispatch: Dispatch) => {
        dispatch(setLoading({type: 'tableBody'}))
        getCallingResultTableBody(id, params)
            .then((res) => {
                dispatch(setTableBodyResult(res.data.content))
                dispatch(setPage(res.data.pageable.pageNumber + 1))
                dispatch(setIsLastPage(res.data.last))
                dispatch(setSuccess({type: 'tableBody'}))
            })
            .catch(
                handlerError(dispatch, (err) => {
                    dispatch(
                        setError({
                            error: err.response?.data.message ?? 'Непредусмотренная ошибка',
                            type: 'tableBody'
                        })
                    )
                })
            )
    }

export const getCallingResultCommonById = (id: number | string) => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'common'}))
    getCallingResultCommon(id)
        .then((res) => {
            dispatch(setCommonResult(res.data))
            dispatch(setSuccess({type: 'common'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({
                        error: err.response?.data.message ?? 'Непредусмотренная ошибка',
                        type: 'common'
                    })
                )
            })
        )
}

export const getCallingResultChartById = (id: number | string) => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'chart'}))
    getCallingResultChart(id)
        .then((res) => {
            // todo фейковые данные убрать
            // dispatch(setChartResult(res.data))
            dispatch(setChartResult(fakeChart))
            dispatch(setSuccess({type: 'chart'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({
                        error: err.response?.data.message ?? 'Непредусмотренная ошибка',
                        type: 'chart'
                    })
                )
            })
        )
}

export const getCallingResultPieChartById = (id: number | string) => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'pieChart'}))
    getCallingResultPieChart(id)
        .then((res) => {
            // todo фейковые данные убрать
            // dispatch(setPieChartResult(res.data))
            dispatch(setPieChartResult(fakePieChart))
            dispatch(setSuccess({type: 'pieChart'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({
                        error: err.response?.data.message ?? 'Непредусмотренная ошибка',
                        type: 'pieChart'
                    })
                )
            })
        )
}

export const {
    resetState,
    setCommonResult,
    setPieChartResult,
    setSuccess,
    setLoading,
    setError,
    setChartResult,
    setTableBodyResult,
    setTableHeaderResult,
    setVariables,
    setIsLastPage,
    setPage
} = callingViewSlice.actions

export const callingCreatingReducers = callingViewSlice.reducer
