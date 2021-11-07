import axios from "axios";
import {DatabaseModel} from "../models";
import {BaseResponse} from "../../../shared/types/base-response";
import {apiRoutes} from "../routes";

export const getDatabases = (): BaseResponse<DatabaseModel[]> => {
    return axios.get(apiRoutes.databases());
};

export const getDatabaseById = (id: number | string): BaseResponse<DatabaseModel> => {
    return axios.get(apiRoutes.databasesId(id));
}

export const deleteDatabaseById = (id: number | string): BaseResponse<DatabaseModel> => {
    return axios.delete(apiRoutes.databasesId(id));
}

export const uploadDatabase = (formData: FormData, name: string): BaseResponse<DatabaseModel> => {
    return axios.post(apiRoutes.databasesUpload(), formData, {params: {name}});
}

