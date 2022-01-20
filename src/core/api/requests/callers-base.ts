import axios, {AxiosRequestConfig} from 'axios'
import {
    CallersBaseDataModel,
    CallersBaseHeaderModel,
    PaginatorModel,
    ParamsPaginatorModel,
    ParamsPaginatorWithFilterModel,
    VariableTypeModel
} from '../models'
import {BaseResponse} from 'shared/types/base-response'
import {apiRoutes} from '../routes'
import {DirectionSort, SortType} from 'shared/data/sort-items'

export interface ParamsPaginatorDataModel extends ParamsPaginatorModel {
    onlyInvalid: boolean
}

export const deleteCallersBase = (
    id: number | string,
    config?: AxiosRequestConfig
): BaseResponse<null> => {
    return axios.delete<null>(apiRoutes.callersBase.byId(id), config)
}

export const getCallersBaseDataById = (
    id: number | string,
    params: ParamsPaginatorDataModel,
    config?: AxiosRequestConfig
): BaseResponse<PaginatorModel<CallersBaseDataModel>> => {
    return axios.get<PaginatorModel<CallersBaseDataModel>>(apiRoutes.callersBase.data.byId(id), {
        ...config,
        params
    })
}

export const getCallersBasesHeader = (
    params: ParamsPaginatorWithFilterModel<SortType, DirectionSort>,
    config?: AxiosRequestConfig
): BaseResponse<PaginatorModel<CallersBaseHeaderModel>> => {
    return axios.get<PaginatorModel<CallersBaseHeaderModel>>(apiRoutes.callersBase.header.list(), {
        ...config,
        params
    })
}

export const getCallersBaseHeaderById = (
    id: number | string,
    config?: AxiosRequestConfig
): BaseResponse<CallersBaseHeaderModel> => {
    return axios.get<CallersBaseHeaderModel>(apiRoutes.callersBase.header.byId(id), config)
}

export const putCallersBaseHeaderById = (
    id: number | string,
    data: CallersBaseHeaderModel,
    config?: AxiosRequestConfig
): BaseResponse<CallersBaseHeaderModel> => {
    return axios.put<CallersBaseHeaderModel>(apiRoutes.callersBase.header.byId(id), data, config)
}

export const uploadCallersBaseExcel = (
    formData: FormData,
    config?: AxiosRequestConfig
): BaseResponse<CallersBaseHeaderModel> => {
    return axios.post<CallersBaseHeaderModel>(apiRoutes.callersBase.uploadExcel(), formData, config)
}

export const getVariablesTypes = (
    config?: AxiosRequestConfig
): BaseResponse<VariableTypeModel[]> => {
    return axios.get<VariableTypeModel[]>(apiRoutes.callersBase.variablesTypes(), config)
}
