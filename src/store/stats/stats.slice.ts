import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {
    DataChartModel,
    getStatsChart as _getStatsChart,
    getStatsCommon as _getStatsCommon,
    getStatsPieChart as _getStatsPieChart,
    StatsCommonModel,
    StatsPieChartModel
} from 'core/api'
import {FetchStatuses} from 'shared/types'
import {ExtraPieChartPartModel} from 'store/calling/view'
import {compare, getColor, getNumber} from 'shared/utils'
import {handlerError} from 'shared/middleware'

interface ExtraStatsPieChartModel extends StatsPieChartModel {
    parts: ExtraPieChartPartModel[]
}

interface StatsState {
    common: {
        data: StatsCommonModel | null
        status: FetchStatuses
    }
    pieChart: {
        data: ExtraStatsPieChartModel | null
        status: FetchStatuses
    }
    chart: {
        data: DataChartModel[]
        status: FetchStatuses
    }
}

type StatsResultTypes = keyof StatsState

const initialState: StatsState = {
    common: {
        data: null,
        status: {}
    },
    chart: {
        data: [],
        status: {}
    },
    pieChart: {
        data: null,
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
        setCommon: (state, action: PayloadAction<StatsCommonModel>) => {
            state.common.data = action.payload
        },
        setChart: (state, action: PayloadAction<DataChartModel[]>) => {
            state.chart.data = action.payload
        },
        setPieChart: (state, action: PayloadAction<StatsPieChartModel>) => {
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
        resetStatsState: (state) => {
            state.common.status = {}
            state.common.data = null
            state.chart.data = []
            state.chart.status = {}
            state.pieChart.data = null
            state.pieChart.status = {}
        }
    }
})

export const getStatsCommon = () => (dispatch: Dispatch) => {
    dispatch(setLoading({type: 'common'}))
    _getStatsCommon()
        .then((res) => {
            dispatch(setCommon(res.data))
            dispatch(setSuccess({type: 'common'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
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
    dispatch(setLoading({type: 'pieChart'}))
    _getStatsPieChart()
        .then((res) => {
            dispatch(setPieChart(res.data))
            dispatch(setSuccess({type: 'pieChart'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
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
    dispatch(setLoading({type: 'chart'}))
    _getStatsChart()
        .then((res) => {
            dispatch(setChart(res.data))
            dispatch(setSuccess({type: 'chart'}))
        })
        .catch(
            handlerError(dispatch, (err) => {
                dispatch(
                    setError({type: 'chart', error: err.response?.data.message ?? 'getStatsCommon'})
                )
            })
        )
}

export const {setError, setLoading, setSuccess, resetStatsState, setPieChart, setCommon, setChart} =
    statsSlice.actions

export const statsReducers = statsSlice.reducer
