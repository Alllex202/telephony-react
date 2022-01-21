import axios, {AxiosRequestConfig} from 'axios'
import {BaseResponse} from 'shared/types/base-response'
import {apiRoutes} from 'core/api/routes'
import {
    CallingModel,
    CallingRequestModel,
    CallingResultCommonModel,
    CallingResultPieChartModel,
    CallingResultTableBodyModel,
    CallingResultTableHeaderModel,
    DataChartModel,
    PaginatorModel,
    ParamsPaginatorModel,
    ParamsPaginatorWithFilterAndStatusModel
} from 'core/api/models'

export const deleteCalling = (
    id: number | string,
    config?: AxiosRequestConfig
): BaseResponse<null> => {
    return axios.delete<null>(apiRoutes.calling.byId(id), config)
}

export const getCallings = (
    params: ParamsPaginatorWithFilterAndStatusModel,
    config?: AxiosRequestConfig
): BaseResponse<PaginatorModel<CallingModel>> => {
    return axios.get<PaginatorModel<CallingModel>>(apiRoutes.calling.calling(), {...config, params})
}

export const createCalling = (
    data: CallingRequestModel,
    config?: AxiosRequestConfig
): BaseResponse<CallingModel> => {
    return axios.post<CallingModel>(apiRoutes.calling.calling(), data, config)
}

export const getCallingsByCallersBaseId = (
    id: number | string,
    config?: AxiosRequestConfig
): BaseResponse<CallingModel[]> => {
    return axios.get<CallingModel[]>(apiRoutes.calling.byCallersBaseId(id), config)
}

export const getCallingById = (
    id: string | number,
    config?: AxiosRequestConfig
): BaseResponse<CallingModel> => {
    return axios.get<CallingModel>(apiRoutes.calling.byId(id), config)
}

export const updateCalling = (
    id: string | number,
    data: CallingRequestModel,
    config?: AxiosRequestConfig
): BaseResponse<CallingModel> => {
    return axios.put<CallingModel>(apiRoutes.calling.byId(id), data, config)
}

export const startScheduledCalling = (
    id: string | number,
    config?: AxiosRequestConfig
): BaseResponse<null> => {
    return axios.post<null>(apiRoutes.calling.scheduledByIdStart(id), config)
}

export const getCallingResultCommon = (
    id: string | number,
    config?: AxiosRequestConfig
): BaseResponse<CallingResultCommonModel> => {
    return axios.get<CallingResultCommonModel>(apiRoutes.calling.result.common(id), config)
}

export const getCallingResultPieChart = (
    id: string | number,
    config?: AxiosRequestConfig
): BaseResponse<CallingResultPieChartModel> => {
    return axios.get<CallingResultPieChartModel>(apiRoutes.calling.result.pieChart(id), config)
}

export const getCallingResultChart = (
    id: string | number,
    config?: AxiosRequestConfig
): BaseResponse<DataChartModel[]> => {
    return axios.get<DataChartModel[]>(apiRoutes.calling.result.chart(id), config)
}

export const getCallingResultTableHeader = (
    id: string | number,
    config?: AxiosRequestConfig
): BaseResponse<CallingResultTableHeaderModel> => {
    return axios.get<CallingResultTableHeaderModel>(
        apiRoutes.calling.result.table.header(id),
        config
    )
}

export const getCallingResultTableBody = (
    id: string | number,
    params: ParamsPaginatorModel,
    config?: AxiosRequestConfig
): BaseResponse<PaginatorModel<CallingResultTableBodyModel>> => {
    return axios.get<PaginatorModel<CallingResultTableBodyModel>>(
        apiRoutes.calling.result.table.data(id),
        {
            ...config,
            params
        }
    )
}
