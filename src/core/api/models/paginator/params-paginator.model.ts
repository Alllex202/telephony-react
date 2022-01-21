import {DirectionSort, SortType} from 'shared/data/sort-items'
import {CallingStatusTypes} from 'core/api/models/calling'

export interface ParamsPaginatorModel {
    page: number
    size: number
}

export interface ParamsPaginatorWithInvalidModel extends ParamsPaginatorModel {
    onlyInvalid: boolean
}

export interface ParamsPaginatorWithFilterModel<SortType, DirectionSort>
    extends ParamsPaginatorModel {
    name?: string
    sortBy?: SortType
    direction?: DirectionSort
}

export interface ParamsPaginatorWithFilterAndStatusModel
    extends ParamsPaginatorWithFilterModel<SortType, DirectionSort> {
    status: CallingStatusTypes
}
