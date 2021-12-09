import {BaseResponse} from 'shared/types/base-response';
import {PaginatorModel, ParamsPaginatorWithFilterModel, ScenarioInfoModel, ScenarioModel} from 'core/api/models';
import axios, {AxiosRequestConfig} from 'axios';
import {DirectionSort, SortType} from 'shared/data/sort-items';
import {apiRoutes} from 'core/api/routes';

export const getScenariosByPage = (params: ParamsPaginatorWithFilterModel<SortType, DirectionSort>, config?: AxiosRequestConfig): BaseResponse<PaginatorModel<ScenarioInfoModel>> => {
    return axios.get<PaginatorModel<ScenarioInfoModel>>(apiRoutes.scenario.scenario(), {...config, params});
};

export const createScenario = (name: string, config?: AxiosRequestConfig): BaseResponse<ScenarioModel> => {
    return axios.post<ScenarioModel>(apiRoutes.scenario.scenario(), null, {...config, params: {name}});
};

export const getScenarioById = (id: number | string, config?: AxiosRequestConfig): BaseResponse<ScenarioModel> => {
    return axios.get<ScenarioModel>(apiRoutes.scenario.byId(id), config);
};

export const putScenarioById = (data: ScenarioModel, config?: AxiosRequestConfig): BaseResponse<ScenarioModel> => {
    return axios.put<ScenarioModel>(apiRoutes.scenario.byId(data.id), data, config);
};

export const deleteScenario = (id: number | string, config?: AxiosRequestConfig): BaseResponse<null> => {
    return axios.delete<null>(apiRoutes.scenario.byId(id), config);
};
