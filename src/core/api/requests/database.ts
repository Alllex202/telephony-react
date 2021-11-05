import axios from "axios";
import {DatabaseModel} from "../models";
import {BaseResponse} from "../../../shared/types/base-response";

export const getDatabases = (): BaseResponse<DatabaseModel[]> => {
    return axios.get('http://10.0.0.2:3333/callers-base');
};
