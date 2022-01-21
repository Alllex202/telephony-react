import {PieChartModel} from 'core/api'

export interface CallingModel {
    callersBase: {
        id: number | string
        name: string
    }
    created: number
    id: number | string
    name: string
    percentEnd: number
    scenario: {
        id: number | string
        name: string
    }
    startDate: number
    status: CallingStatusTypes
}

export interface CallingRequestModel {
    callersBase: {
        id: number | string
    }
    id: number | string | null
    name: string
    scenario: {
        id: number | string
    }
    startDate?: number | null
    status: CallingStatusTypes
}

export type CallingStatusTypes = 'RUN' | 'SCHEDULED' | 'DONE'

export interface CallingStatusModel {
    name: CallingStatusTypes
    message: string
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
    status: CallingStatusTypes
    name: string
    progress: {
        countCallers: number
        countEnd: number
        percentEnd: number
    }
    startDialing: number
    endDialing: number
}

export interface CallingResultPieChartModel extends PieChartModel {
    percentSuccess: number
    countSuccess: number
    countCallers: number
}

export interface CallingResultTableHeaderDataModel {
    id: number | string
    created: number
    nameInTable: string
    currentName: string
    type: string
}

export interface CallingResultTableBodyDataModel {
    id: number | string
    created: number
    phoneColumn: boolean
    valid: boolean
    value: string
}

export interface CallingResultTableHeaderModel {
    original: CallingResultTableHeaderDataModel[]
    extra: CallingResultTableHeaderDataModel[]
}

export interface CallingResultTableBodyModel {
    original: CallingResultTableBodyDataModel[]
    extra: CallingResultTableBodyDataModel[]
    number: number
}
