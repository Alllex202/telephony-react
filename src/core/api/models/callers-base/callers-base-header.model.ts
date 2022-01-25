import {IdKey} from 'shared/types/id-key'

export interface CallersBaseHeaderModel {
    id: IdKey
    created: number
    countCallers: number
    countInvalidCallers: number
    columns: Array<CallersBaseHeaderColumnModel>
    name: string
    confirmed: boolean
    updated: number
}

export interface CallersBaseHeaderColumnModel {
    id: number
    created: number
    nameInTable: string
    currentName: string
    type: string
}
