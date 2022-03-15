import {IdKey} from 'shared/types/id-key'

export interface CallersBaseDataModel {
    id: IdKey
    created: number
    variables: Array<CallersBaseDataColumnModel>
}

export interface CallersBaseDataColumnModel {
    id: number
    created: number
    value: string
    isValid: boolean
    isPhoneColumn: boolean
}
