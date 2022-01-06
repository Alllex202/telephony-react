import axios, {AxiosRequestConfig} from 'axios'
import {BaseResponse} from 'shared/types/base-response'
import {DataChartModel, StatsCommonModel, StatsPieChartModel} from 'core/api/models'
import {apiRoutes} from 'core/api/routes'

export const getStatsCommon = (config?: AxiosRequestConfig): BaseResponse<StatsCommonModel> => {
    return axios.get<StatsCommonModel>(apiRoutes.stats.common(), config)
}

export const getStatsPieChart = (config?: AxiosRequestConfig): BaseResponse<StatsPieChartModel> => {
    return axios.get<StatsPieChartModel>(apiRoutes.stats.pieChart(), config)
}

export const getStatsChart = (config?: AxiosRequestConfig): BaseResponse<DataChartModel[]> => {
    return axios.get<DataChartModel[]>(apiRoutes.stats.chart(), config)
}
