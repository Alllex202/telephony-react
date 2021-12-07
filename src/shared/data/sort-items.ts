export type SortType = 'NAME' | 'CREATION_DATE';
export type DirectionSort = 'ASC' | 'DESC';

export interface SortItem {
    sortBy: SortType,
    direction: DirectionSort,
    text: string,
}

export const sortItemsCallersBaseList: SortItem[] = [
    {sortBy: 'CREATION_DATE', direction: 'DESC', text: 'Сначала новые'},
    {sortBy: 'CREATION_DATE', direction: 'ASC', text: 'Сначала старые'},
    {sortBy: 'NAME', direction: 'ASC', text: 'От А до Я'},
    {sortBy: 'NAME', direction: 'DESC', text: 'От Я до А'},
];

export const sortItemsScenarioList: SortItem[] = [
    {sortBy: 'CREATION_DATE', direction: 'DESC', text: 'Сначала новые'},
    {sortBy: 'CREATION_DATE', direction: 'ASC', text: 'Сначала старые'},
    {sortBy: 'NAME', direction: 'ASC', text: 'От А до Я'},
    {sortBy: 'NAME', direction: 'DESC', text: 'От Я до А'},
];
