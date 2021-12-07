export interface ParamsPaginatorModel {
    page: number,
    size: number,
}

export interface ParamsPaginatorWithFilterModel<SortType, DirectionSort> extends ParamsPaginatorModel {
    name?: string,
    sortBy?: SortType,
    direction?: DirectionSort,
}
