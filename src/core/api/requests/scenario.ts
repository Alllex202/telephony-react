import {BaseResponse} from 'shared/types/base-response';
import {PaginatorModel, ParamsPaginatorWithFilterModel, ScenarioInfoModel} from 'core/api/models';
import axios, {AxiosRequestConfig} from 'axios';
import {DirectionSort, SortType} from 'shared/data/sort-items';
import {apiRoutes} from 'core/api/routes';


// TODO set url

export const getScenariosByPage = (params: ParamsPaginatorWithFilterModel<SortType, DirectionSort>, config?: AxiosRequestConfig): BaseResponse<PaginatorModel<ScenarioInfoModel>> => {
    return axios.get<PaginatorModel<ScenarioInfoModel>>('', {...config, params});
};

export const deleteScenario = (id: number | string, config?: AxiosRequestConfig): BaseResponse<null> => {
    return axios.delete<null>('', config);
};
