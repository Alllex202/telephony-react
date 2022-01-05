export interface CallingModel {
    callersBase: {
        id: number | string
        name?: string
    }
    created?: number
    id?: number | string | null
    name: string
    percentEnd?: number
    scenario: {
        id: number | string
        name?: string
    }
    startDate?: number | null
    status: CallingStatuses
}

export type CallingStatuses = 'RUN' | 'SCHEDULED' | 'DONE'

export interface CallingStatusModel {
    name: CallingStatuses
    message: string
}

export const callingStatuses: Record<CallingStatuses, CallingStatusModel> = {
    RUN: {
        name: 'RUN',
        message: 'Текущие'
    },
    SCHEDULED: {
        name: 'SCHEDULED',
        message: 'Запланированные'
    },
    DONE: {
        name: 'DONE',
        message: 'Завершенные'
    }
}

export interface CallingResultCommonModel {
    id: number | string
    created: number
    startDate: number
    scenario: {
        scenarioId: number
        countSteps: number
        name: string
    }
    callersBase: {
        id: number
        name: string
        countCallers: number
    }
    status: CallingStatuses
    name: string
    progress: {
        countCallers: number
        countEnd: number
        percentEnd: number
    }
    startDialing: number
    endDialing: number
}

export type PieChartTypes = 'CORRECT' | 'HAVEN_NOT_REACHED' | 'SCENARIO_NOT_END' | 'IN_PROGRESS'

export interface PieChartPartModel {
    name: string
    value: number
    key: PieChartTypes
}

export interface CallingResultPieChartModel {
    parts: PieChartPartModel[]
    percentSuccess: number
    countSuccess: number
    countCallers: number
}

export interface DataChartModel {
    date: number
    successCalls: number
}

export interface CallingResultTableHeaderData {
    id: number | string
    created: number
    nameInTable: string
    currentName: string
    type: string
}

export interface CallingResultTableBodyData {
    id: number | string
    created: number
    phoneColumn: boolean
    valid: boolean
    value: string
}

export interface CallingResultTableHeader {
    original: CallingResultTableHeaderData[]
    extra: CallingResultTableHeaderData[]
}

export interface CallingResultTableBody {
    original: CallingResultTableBodyData[]
    extra: CallingResultTableBodyData[]
    number: number
}
