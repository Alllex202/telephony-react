import {CallingResultPieChartModel} from 'core/api/models/calling'

export interface TimeModel {
    hours: number
    minutes: number
    seconds: number
}

export interface StatsCommonModel {
    totalDiallings: number
    averageNumberOfCallsPerDialling: number
    averageDiallingDuration: TimeModel
    averageCallDuration: TimeModel
}

export interface StatsPieChartModel extends Omit<CallingResultPieChartModel, 'countCallers' | 'countSuccess'> {
}
