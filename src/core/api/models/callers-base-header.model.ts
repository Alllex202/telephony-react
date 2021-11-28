export interface CallersBaseHeaderModel {
    id: number | string,
    created: number,
    countCallers: number,
    countInvalidCallers: number,
    columns: Array<CallersBaseHeaderColumnModel>,
    name: string,
    confirmed: boolean,
    updated: number,
}

export interface CallersBaseHeaderColumnModel {
    id: number,
    created: number,
    nameInTable: string,
    currentName: string,
    type: string,
}
