export interface CallersBaseDataModel {
    id: number | string
    created: number
    variables: Array<CallersBaseDataColumnModel>
}

export interface CallersBaseDataColumnModel {
    id: number
    created: number
    value: string
    valid: boolean
    phoneColumn: boolean
}
