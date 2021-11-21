import axios, {AxiosRequestConfig, CancelToken} from "axios";
import {CallersBaseDataModel, CallersBaseHeaderModel, PaginatorModel, VariableTypeModel} from "../models";
import {BaseResponse} from "../../../shared/types/base-response";
import {apiRoutes} from "../routes";
import {Dispatch} from "@reduxjs/toolkit";
import {DefaultAxiosError} from "../../../shared/types/base-response-error";
import {
    addCallersBases,
    setError,
    setLastPage,
    setLoading, setPage,
    setSuccess
} from "../../../store/features/callers-bases/list";

export type SortType = 'NAME' | 'CREATION_DATE' | 'COUNT_VARIABLES';
export type DirectionSort = 'ASC' | 'DESC';

export interface ParamsPaginatorHeader<SortType, DirectionSort> {
    page: number,
    size: number,
    name?: string,
    sortBy?: SortType,
    direction?: DirectionSort,
}

export interface ParamsPaginatorData {
    page: number,
    size: number,
}

export const deleteCallersBase = (id: number | string, config?: AxiosRequestConfig): BaseResponse<null> => {
    return axios.delete<null>(apiRoutes.callersBase.byId(id), config);
};

export const getCallersBaseDataById = (id: number | string, params: ParamsPaginatorData, config?: AxiosRequestConfig): BaseResponse<PaginatorModel<CallersBaseDataModel>> => {
    return axios.get<PaginatorModel<CallersBaseDataModel>>(apiRoutes.callersBase.dataById(id), {...config, params});
};

// export const getCallersBasesHeader = (params: ParamsPaginatorHeader, config?: AxiosRequestConfig): BaseResponse<PaginatorModel<CallersBaseHeaderModel>> => {
//     return axios.get<PaginatorModel<CallersBaseHeaderModel>>(apiRoutes.callersBase.header(), {...config, params});
// };

export const getCallersBasesByPage = (params: ParamsPaginatorHeader<SortType, DirectionSort>, cancelToken?: CancelToken, otherConfig?: AxiosRequestConfig) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading());
        axios.get<PaginatorModel<CallersBaseHeaderModel>>(apiRoutes.callersBase.header(), {
            ...otherConfig,
            params,
            cancelToken
        })
            .then((res) => {
                dispatch(addCallersBases(res.data.content))
                if (res.data.last) {
                    dispatch(setLastPage(res.data.last));
                }
                dispatch(setPage(res.data.pageable.pageNumber));
                dispatch(setSuccess());
            })
            .catch((err: DefaultAxiosError) => {
                dispatch(setError(err.response?.data.error || 'Необработанная ошибка'));
            });
    };
}

export const getCallersBaseHeaderById = (id: number | string, config?: AxiosRequestConfig): BaseResponse<CallersBaseHeaderModel> => {
    return axios.get<CallersBaseHeaderModel>(apiRoutes.callersBase.headerById(id), config);
};

export const putCallersBaseHeaderById = (id: number | string, data: CallersBaseHeaderModel, config?: AxiosRequestConfig): BaseResponse<CallersBaseHeaderModel> => {
    return axios.put<CallersBaseHeaderModel>(apiRoutes.callersBase.headerById(id), data, config);
};

export const uploadCallersBaseExcel = (formData: FormData, config?: AxiosRequestConfig): BaseResponse<CallersBaseHeaderModel> => {
    return axios.post<CallersBaseHeaderModel>(apiRoutes.callersBase.uploadExcel(), formData, config);
};

export const getVariablesTypes = (config?: AxiosRequestConfig): BaseResponse<VariableTypeModel[]> => {
    return axios.get<VariableTypeModel[]>(apiRoutes.callersBase.variablesTypes(), config);
};
