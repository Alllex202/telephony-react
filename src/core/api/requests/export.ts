import {BaseResponse} from 'shared/types/base-response'
import axios, {AxiosRequestConfig} from 'axios'
import {apiRoutes} from 'core/api/routes'

export const exportCallingResults = (id: string | number, config?: AxiosRequestConfig): BaseResponse<{byteArray: Blob}> => {
    return axios.get<{byteArray: Blob}>(apiRoutes.export.calling(id), config)
}
