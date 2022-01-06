import {CallingResultPieChartModel} from 'core/api/models/calling'

export interface StatsCommonModel {
    totalDiallings: number
    averageNumberOfCallsPerDialling: number
    averageDiallingDuration: number
    averageCallDuration: number
}

export interface StatsPieChartModel extends Omit<CallingResultPieChartModel, 'countCallers' | 'countSuccess'> {
}
