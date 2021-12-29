import axios, {AxiosRequestConfig} from 'axios'
import {BaseResponse} from 'shared/types/base-response'
import {apiRoutes} from 'core/api/routes'
import {CallingModel, PaginatorModel, ParamsPaginatorWithFilterAndStatusModel} from 'core/api/models'

export const deleteCalling = (id: number | string, config?: AxiosRequestConfig): BaseResponse<null> => {
    return axios.delete<null>(apiRoutes.calling.byId(id), config)
}

export const getCallings = (params: ParamsPaginatorWithFilterAndStatusModel, config?: AxiosRequestConfig): BaseResponse<PaginatorModel<CallingModel>> => {
    return axios.get<PaginatorModel<CallingModel>>(apiRoutes.calling.calling(), {...config, params})
}

export const createCalling = (data: CallingModel, config?: AxiosRequestConfig): BaseResponse<CallingModel> => {
    return axios.post<CallingModel>(apiRoutes.calling.calling(), data, config)
}
