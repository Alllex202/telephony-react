import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {
    CallingResultPieChartModel,
    DataChartModel,
    getStatsChart as _getStatsChart,
    getStatsCommon as _getStatsCommon,
    getStatsPieChart as _getStatsPieChart,
    StatsCommonModel,
    StatsPieChartModel
} from 'core/api'
import {FetchStatuses} from 'shared/types/fetch-statuses'
import {ExtraPieChartPartModel} from 'store/features/calling/view'
import {compare, getColor, getNumber} from 'shared/utils'
import {handlerError} from 'shared/middleware'
import {enqueueSnackbar} from 'store/features/notifications'
import {push} from 'connected-react-router'

type StatsResultTypes = 'common' | 'pieChart' | 'chart'

interface ExtraStatsPieChartModel extends StatsPieChartModel {
    parts: ExtraPieChartPartModel[]
}

interface StatsState {
    common: {
        result: StatsCommonModel | null
        status: FetchStatuses
    }
    pieChart: {
        result: ExtraStatsPieChartModel | null
        status: FetchStatuses
    }
    chart: {
        result: DataChartModel[] | null
        status: FetchStatuses
    }
}

const initialState: StatsState = {
    common: {
        result: null,
        status: {}
    },
    chart: {
        result: null,
        status: {}
    },
    pieChart: {
        result: null,
        status: {}
    }
}

const statsSlice = createSlice({
    initialState,
    name: 'stats',
    reducers: {
        setLoading: (state, action: PayloadAction<{ type: StatsResultTypes }>) => {
            state[action.payload.type].status = {isLoading: true}
        },
        setSuccess: (state, action: PayloadAction<{ type: StatsResultTypes }>) => {
            state[action.payload.type].status = {isSuccess: true}
        },
        setError: (state, action: PayloadAction<{ error: string, type: StatsResultTypes }>) => {
            state[action.payload.type].status = {isError: true, error: action.payload.error}
        },
        setCommonResult: (state, action: PayloadAction<StatsCommonModel>) => {
            state.common.result = action.payload
        },
        setChartResult: (state, action: PayloadAction<DataChartModel[]>) => {
            state.chart.result = action.payload
        },
        setPieChartResult: (state, action: PayloadAction<StatsPieChartModel>) => {
            state.pieChart.result = {
                ...action.payload,
                parts: action.payload.parts.map((el) => {
                        return {
                            ...el,
                            color: getColor(el.key),
                            number: getNumber(el.key)
                        }
                    })
                    .sort(compare)
            }
        },
        resetState: (state) => {
            state.common.status = {}
            state.common.result = null
            state.chart.result = null
            state.chart.status = {}
            state.pieChart.result = null
            state.pieChart.status = {}
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

const fakePieChart: StatsPieChartModel = {
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

export const getStatsCommon = () => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'common'}))
    _getStatsCommon()
        .then(res => {
            dispatch(setCommonResult(res.data))
            dispatch(setSuccess({type: 'common'}))
        })
        .catch(handlerError(dispatch, (err) => {
            console.log({type: 'ERROR', message: err.response?.data.message ?? 'getStatsCommon'})
            dispatch(setError({type: 'common', error: err.response?.data.message ?? 'getStatsCommon'}))
        }))
}

export const getStatsPieChart = () => (dispatch: Dispatch) => {
    // todo remove fake data
    dispatch(setPieChartResult(fakePieChart))
    dispatch(setLoading({type: 'pieChart'}))
    _getStatsPieChart()
        .then(res => {
            // dispatch(setPieChartResult(res.data))
            dispatch(setSuccess({type: 'pieChart'}))
        })
        .catch(handlerError(dispatch, (err) => {
            console.log({type: 'ERROR', message: err.response?.data.message ?? 'getStatsPieChart'})
            dispatch(setError({type: 'pieChart', error: err.response?.data.message ?? 'getStatsCommon'}))
        }))
}

export const getStatsChart = () => (dispatch: Dispatch) => {
    // todo remove fake data
    dispatch(setChartResult(fakeChart))
    dispatch(setLoading({type: 'chart'}))
    _getStatsChart()
        .then(res => {
            // dispatch(setChartResult(res.data))
            dispatch(setSuccess({type: 'chart'}))
        })
        .catch(handlerError(dispatch, (err) => {
            console.log({type: 'ERROR', message: err.response?.data.message ?? 'getStatsChart'})
            dispatch(setError({type: 'chart', error: err.response?.data.message ?? 'getStatsCommon'}))
        }))
}

export const {
    setError,
    setLoading,
    setSuccess,
    setPieChartResult,
    setCommonResult,
    setChartResult,
    resetState
} = statsSlice.actions

export const statsReducers = statsSlice.reducer
