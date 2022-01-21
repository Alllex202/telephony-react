import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {
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
import {fakePieChart} from 'shared/data/fake/fake-pie-chart-stats'
import {fakeChart} from 'shared/data/fake/fake-data-line-chart'

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
        setLoading: (state, action: PayloadAction<{type: StatsResultTypes}>) => {
            state[action.payload.type].status = {isLoading: true}
        },
        setSuccess: (state, action: PayloadAction<{type: StatsResultTypes}>) => {
            state[action.payload.type].status = {isSuccess: true}
        },
        setError: (state, action: PayloadAction<{error: string; type: StatsResultTypes}>) => {
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

export const getStatsCommon = () => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'common'}))
    _getStatsCommon()
        .then((res) => {
            dispatch(setCommonResult(res.data))
            dispatch(setSuccess({type: 'common'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                console.log({
                    type: 'ERROR',
                    message: err.response?.data.message ?? 'getStatsCommon'
                })
                dispatch(
                    setError({
                        type: 'common',
                        error: err.response?.data.message ?? 'getStatsCommon'
                    })
                )
            })
        )
}

export const getStatsPieChart = () => (dispatch: Dispatch) => {
    // todo remove fake data
    dispatch(setPieChartResult(fakePieChart))
    dispatch(setLoading({type: 'pieChart'}))
    _getStatsPieChart()
        .then((res) => {
            // dispatch(setPieChartResult(res.data))
            dispatch(setSuccess({type: 'pieChart'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                console.log({
                    type: 'ERROR',
                    message: err.response?.data.message ?? 'getStatsPieChart'
                })
                dispatch(
                    setError({
                        type: 'pieChart',
                        error: err.response?.data.message ?? 'getStatsCommon'
                    })
                )
            })
        )
}

export const getStatsChart = () => (dispatch: Dispatch) => {
    // todo remove fake data
    dispatch(setChartResult(fakeChart))
    dispatch(setLoading({type: 'chart'}))
    _getStatsChart()
        .then((res) => {
            // dispatch(setChartResult(res.data))
            dispatch(setSuccess({type: 'chart'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                console.log({type: 'ERROR', message: err.response?.data.message ?? 'getStatsChart'})
                dispatch(
                    setError({type: 'chart', error: err.response?.data.message ?? 'getStatsCommon'})
                )
            })
        )
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
