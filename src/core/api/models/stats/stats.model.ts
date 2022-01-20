import {CallingResultPieChartModel} from 'core/api/models/calling'

export interface TimeModel {
    hours: number
    minutes: number
    seconds: number
}

export interface StatsCommonModel {
    totalDialings: number
    averageNumberOfCallsPerDialing: number
    averageDialingDuration: TimeModel
    averageCallDuration: TimeModel
}

export interface StatsPieChartModel
    extends Omit<CallingResultPieChartModel, 'countCallers' | 'countSuccess'> {}
