import {PieChartModel} from 'core/api'
import {IdKey} from 'shared/types/id-key'

export interface CallingModel {
    callersBase: {
        id: IdKey
        name: string
    }
    created: number
    id: IdKey
    name: string
    percentEnd: number
    scenario: {
        id: IdKey
        name: string
    }
    startDate: number
    status: CallingStatusTypes
}

export interface CallingRequestModel {
    callersBase: {
        id: IdKey
    }
    id: IdKey | null
    name: string
    scenario: {
        id: IdKey
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
    id: IdKey
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
    id: IdKey
    created: number
    nameInTable: string
    currentName: string
    type: string
}

export interface CallingResultTableBodyDataModel {
    id: IdKey
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
