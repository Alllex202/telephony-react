import axios, {AxiosRequestConfig} from "axios";
import {DatabaseModel} from "../models";
import {BaseResponse} from "../../../shared/types/base-response";
import {apiRoutes} from "../routes";

export const getDatabases = (config?: AxiosRequestConfig): BaseResponse<DatabaseModel[]> => {
    return axios.get<DatabaseModel[]>(apiRoutes.databases(), config);
};

export const getDatabaseById = (id: number | string, config?: AxiosRequestConfig): BaseResponse<DatabaseModel> => {
    return axios.get(apiRoutes.databasesId(id), config);
}

export const deleteDatabaseById = (id: number | string, config?: AxiosRequestConfig): BaseResponse<DatabaseModel> => {
    return axios.delete(apiRoutes.databasesId(id), config);
}

export const uploadDatabase = (formData: FormData, config?: AxiosRequestConfig): BaseResponse<DatabaseModel> => {
    return axios.post(apiRoutes.databasesUpload(), formData, {...config});
}

