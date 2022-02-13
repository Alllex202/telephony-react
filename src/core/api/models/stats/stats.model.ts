import {PieChartModel} from 'core/api'

export interface TimeModel {
    hours: number
    minutes: number
    seconds: number
}

export interface StatsCommonModel {
    totalDialings: number
    averageNumberOfCallsPerDialing: number
    averageDialingsDuration: TimeModel
    averageCallDuration: TimeModel
}

export interface StatsPieChartModel extends PieChartModel {
    percentSuccess: number
}
