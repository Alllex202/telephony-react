import {BaseResponse} from 'shared/types/base-response'
import axios, {AxiosRequestConfig} from 'axios'
import {apiRoutes} from 'core/api/routes'
import {IdKey} from 'shared/types/id-key'

export const exportCallingResults = (
    id: IdKey,
    config?: AxiosRequestConfig
): BaseResponse<{byteArray: Blob}> => {
    return axios.get<{byteArray: Blob}>(apiRoutes.export.calling(id), config)
}
