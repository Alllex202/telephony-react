import axios, {AxiosRequestConfig} from 'axios';
import {BaseResponse} from 'shared/types/base-response';
import {apiRoutes} from 'core/api/routes';
import {CallingModel, PaginatorModel, ParamsPaginatorWithFilterModel} from 'core/api/models';
import {DirectionSort, SortType} from 'shared/data/sort-items';

export const deleteCalling = (id: number | string, config?: AxiosRequestConfig): BaseResponse<null> => {
    return axios.delete<null>(apiRoutes.calling.byId(id), config);
};

export const getCallings = (params: ParamsPaginatorWithFilterModel<SortType, DirectionSort>, config?: AxiosRequestConfig): BaseResponse<PaginatorModel<CallingModel>> => {
    return axios.get<PaginatorModel<CallingModel>>(apiRoutes.calling.calling(), {...config, params});
};

export const createCalling = (data: CallingModel, config?: AxiosRequestConfig): BaseResponse<CallingModel> => {
    return axios.post<CallingModel>(apiRoutes.calling.calling(), data, config);
};
