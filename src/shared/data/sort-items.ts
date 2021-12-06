import {DirectionSort, SortType} from "core/api/requests";

interface sortItem {
    sortBy: SortType,
    direction: DirectionSort,
    text: string,
}

export const sortItemsCallersBaseList: sortItem[] = [
    {sortBy: 'CREATION_DATE', direction: 'DESC', text: 'Сначала новые'},
    {sortBy: 'CREATION_DATE', direction: 'ASC', text: 'Сначала старые'},
    {sortBy: 'NAME', direction: 'ASC', text: 'От А до Я'},
    {sortBy: 'NAME', direction: 'DESC', text: 'От Я до А'},
];
