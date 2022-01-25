import {IdKey} from 'shared/types/id-key'

export interface ScenarioInfoModel {
    id: IdKey
    name: string
    created: number
    countSteps: number
}
