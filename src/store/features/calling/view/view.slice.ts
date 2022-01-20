import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {
    CallingResultCommonModel,
    CallingResultPieChartModel,
    CallingResultTableBody,
    CallingResultTableHeader,
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
        result: CallingResultTableHeader | null
        status: FetchStatuses
    }
    tableBody: {
        result: CallingResultTableBody[]
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
        setTableHeaderResult: (state, action: PayloadAction<CallingResultTableHeader>) => {
            state.tableHeader.result = action.payload
        },
        setTableBodyResult: (state, action: PayloadAction<CallingResultTableBody[]>) => {
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

const fakeChart: DataChartModel[] = [
    {
        date: Date.parse('1995-12-17T00:00:00'),
        time: '00:00',
        successCalls: 15
    },
    {
        date: Date.parse('1995-12-17T01:00:00'),
        time: '01:00',
        successCalls: 5
    },
    {
        date: Date.parse('1995-12-17T02:00:00'),
        time: '02:00',
        successCalls: 3
    },
    {
        date: Date.parse('1995-12-17T03:00:00'),
        time: '03:00',
        successCalls: 9
    },
    {
        date: Date.parse('1995-12-17T04:00:00'),
        time: '04:00',
        successCalls: 15
    },
    {
        date: Date.parse('1995-12-17T05:00:00'),
        time: '05:00',
        successCalls: 17
    },
    {
        date: Date.parse('1995-12-17T06:00:00'),
        time: '06:00',
        successCalls: 30
    },
    {
        date: Date.parse('1995-12-17T07:00:00'),
        time: '07:00',
        successCalls: 10
    },
    {
        date: Date.parse('1995-12-17T08:00:00'),
        time: '08:00',
        successCalls: 50
    },
    {
        date: Date.parse('1995-12-17T09:00:00'),
        time: '09:00',
        successCalls: 100
    },
    {
        date: Date.parse('1995-12-17T10:00:00'),
        time: '10:00',
        successCalls: 5
    },
    {
        date: Date.parse('1995-12-17T11:00:00'),
        time: '11:00',
        successCalls: 25
    },
    {
        date: Date.parse('1995-12-17T12:00:00'),
        time: '12:00',
        successCalls: 14
    },
    {
        date: Date.parse('1995-12-17T13:00:00'),
        time: '13:00',
        successCalls: 43
    },
    {
        date: Date.parse('1995-12-17T14:00:00'),
        time: '14:00',
        successCalls: 23
    },
    {
        date: Date.parse('1995-12-17T15:00:00'),
        time: '15:00',
        successCalls: 43
    },
    {
        date: Date.parse('1995-12-17T16:00:00'),
        time: '16:00',
        successCalls: 52
    },
    {
        date: Date.parse('1995-12-17T17:00:00'),
        time: '17:00',
        successCalls: 1
    },
    {
        date: Date.parse('1995-12-17T18:00:00'),
        time: '18:00',
        successCalls: 12
    },
    {
        date: Date.parse('1995-12-17T19:00:00'),
        time: '19:00',
        successCalls: 31
    },
    {
        date: Date.parse('1995-12-17T20:00:00'),
        time: '20:00',
        successCalls: 67
    },
    {
        date: Date.parse('1995-12-17T21:00:00'),
        time: '21:00',
        successCalls: 31
    },
    {
        date: Date.parse('1995-12-17T22:00:00'),
        time: '22:00',
        successCalls: 35
    },
    {
        date: Date.parse('1995-12-17T23:00:00'),
        time: '23:00',
        successCalls: 32
    }
]

const fakePieChart: CallingResultPieChartModel = {
    countSuccess: 70,
    countCallers: 100,
    percentSuccess: 70,
    parts: [
        {
            name: 'Успешно завершенные',
            value: 70,
            key: 'CORRECT'
        },
        {
            name: 'Сценарий не завершен',
            value: 8,
            key: 'SCENARIO_NOT_END'
        },
        {
            name: 'Не дозвонились',
            value: 8,
            key: 'HAVEN_NOT_REACHED'
        },
        {
            name: 'В процессе',
            value: 14,
            key: 'IN_PROGRESS'
        }
    ]
}

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
