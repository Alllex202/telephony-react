import axios, {CancelToken} from "axios";
import {DatabaseModel} from "../models";
import {BaseResponse} from "../../../shared/types/base-response";
import {apiRoutes} from "../routes";

export const getDatabases = (cancelToken?: CancelToken): BaseResponse<DatabaseModel[]> => {
    return axios.get<DatabaseModel[]>(apiRoutes.databases(), {cancelToken});
};

export const getDatabaseById = (id: number | string, cancelToken?: CancelToken): BaseResponse<DatabaseModel> => {
    return axios.get(apiRoutes.databasesId(id), {cancelToken});
}

export const deleteDatabaseById = (id: number | string): BaseResponse<DatabaseModel> => {
    return axios.delete(apiRoutes.databasesId(id));
}

export const uploadDatabase = (formData: FormData, name: string): BaseResponse<DatabaseModel> => {
    return axios.post(apiRoutes.databasesUpload(), formData, {params: {name}});
}

