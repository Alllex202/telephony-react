export type PieChartTypes = 'CORRECT' | 'HAVEN_NOT_REACHED' | 'SCENARIO_NOT_END' | 'IN_PROGRESS'

export interface PieChartPartModel {
    name: string
    value: number
    key: PieChartTypes
}

export interface PieChartModel {
    parts: PieChartPartModel[]
}
