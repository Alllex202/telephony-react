import {DirectionSort, SortType} from 'shared/data/sort-items'
import {CallingStatuses} from 'core/api/models/calling'

export interface ParamsPaginatorModel {
    page: number,
    size: number,
}

export interface ParamsPaginatorWithFilterModel<SortType, DirectionSort> extends ParamsPaginatorModel {
    name?: string,
    sortBy?: SortType,
    direction?: DirectionSort,
}

export interface ParamsPaginatorWithFilterAndStatusModel
    extends ParamsPaginatorWithFilterModel<SortType, DirectionSort> {
    status: CallingStatuses,
}
