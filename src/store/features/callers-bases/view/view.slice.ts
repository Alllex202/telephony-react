import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {CallersBaseDataModel, CallersBaseHeaderModel, VariableTypeModel} from "core/api";
import {FetchStatuses} from "shared/types/fetch-statuses";
import {
    getCallersBaseDataById,
    getCallersBaseHeaderById,
    getVariablesTypes,
    ParamsPaginatorData, putCallersBaseHeaderById
} from "core/api/requests";
import {DefaultAxiosError} from "shared/types/base-response-error";
import {RootState} from "store";

export interface ViewState {
    header: CallersBaseHeaderModel | null;
    data: CallersBaseDataModel[] | null;
    page: number;
    size: number;
    isLastPage: boolean;
    statusesHeader: FetchStatuses;
    statusesData: FetchStatuses;
    statusesVariables: FetchStatuses;
    variablesTypes: VariableTypeModel[] | null,
    onlyInvalid: boolean,
}

const initialState: ViewState = {
    header: null,
    data: null,
    statusesHeader: {},
    statusesData: {},
    statusesVariables: {},
    variablesTypes: null,
    page: 0,
    isLastPage: false,
    size: 50,
    onlyInvalid: false,
};

export const callersBaseViewSlice = createSlice({
    name: 'callersBaseView',
    initialState,
    reducers: {
        setType: (state: ViewState, action: PayloadAction<boolean>) => {
            state.onlyInvalid = action.payload;
        },
        setVariables: (state: ViewState, action: PayloadAction<VariableTypeModel[]>) => {
            state.variablesTypes = action.payload;
        },
        setHeader: (state: ViewState, action: PayloadAction<CallersBaseHeaderModel>) => {
            state.header = action.payload;
        },
        pushDataPage: (state: ViewState, action: PayloadAction<CallersBaseDataModel[]>) => {
            if (state.data === null) {
                state.data = action.payload;
            } else {
                state.data.push(...action.payload);
            }
        },
        resetData: (state: ViewState) => {
            state.data = null;
            state.page = 0;
            state.isLastPage = false;
        },
        setPage: (state: ViewState, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setLastPage: (state: ViewState, action: PayloadAction<boolean>) => {
            state.isLastPage = action.payload;
        },
        resetPage: (state: ViewState) => {
            state.page = 0;
            state.isLastPage = false;
        },
        setHeaderLoading: (state: ViewState) => {
            state.statusesHeader = {isLoading: true};
        },
        setHeaderSuccess: (state: ViewState) => {
            state.statusesHeader = {isSuccess: true};
        },
        setHeaderError: (state: ViewState, action: PayloadAction<string>) => {
            state.statusesHeader = {isError: true, error: action.payload};
        },
        resetHeaderStatuses: (state: ViewState) => {
            state.statusesHeader = {};
        },
        setDataLoading: (state: ViewState) => {
            state.statusesData = {isLoading: true};
        },
        setDataSuccess: (state: ViewState) => {
            state.statusesData = {isSuccess: true};
        },
        setDataError: (state: ViewState, action: PayloadAction<string>) => {
            state.statusesData = {isError: true, error: action.payload};
        },
        resetDataStatuses: (state: ViewState) => {
            state.statusesData = {};
        },
        setVariablesLoading: (state: ViewState) => {
            state.statusesVariables = {isLoading: true};
        },
        setVariablesSuccess: (state: ViewState) => {
            state.statusesVariables = {isSuccess: true};
        },
        setVariablesError: (state: ViewState, action: PayloadAction<string>) => {
            state.statusesVariables = {isError: true, error: action.payload};
        },
        resetVariablesStatuses: (state: ViewState) => {
            state.statusesVariables = {};
        },
        resetAll: (state: ViewState) => {
            state.header = null;
            state.data = null;
            state.statusesHeader = {};
            state.statusesData = {};
            state.page = 0;
            state.isLastPage = false;
            state.onlyInvalid = false;
        }
    }
});

export const getCallersBaseById = (id: number | string) => (dispatch: Dispatch) => {
    dispatch(setHeaderLoading());
    getCallersBaseHeaderById(id)
        .then(res => {
            dispatch(setHeader(res.data));
            dispatch(setHeaderSuccess());
        })
        .catch((err: DefaultAxiosError) => {
            dispatch(setHeaderError(err.response?.data.message || 'Ошибка при получении данных'));
        });
};

export const getCallersBaseDataByPage = (id: number | string, params: ParamsPaginatorData) => (dispatch: Dispatch) => {
    dispatch(setDataLoading());
    getCallersBaseDataById(id, params)
        .then(res => {
            dispatch(pushDataPage(res.data.content));
            if (res.data.last) {
                dispatch(setLastPage(true));
            }
            dispatch(setPage(res.data.pageable.pageNumber));
            dispatch(setDataSuccess());
        })
        .catch((err: DefaultAxiosError) => {
            dispatch(setDataError(err.response?.data.message || 'Ошибка при получении данных'));
        });
};

export const updateCallersBaseDataByPage = (id: number | string, params: ParamsPaginatorData) => (dispatch: Dispatch) => {
    dispatch(setDataLoading());
    getCallersBaseDataById(id, params)
        .then(res => {
            dispatch(resetData());
            dispatch(pushDataPage(res.data.content));
            if (res.data.last) {
                dispatch(setLastPage(true));
            }
            dispatch(setPage(res.data.pageable.pageNumber));
            dispatch(setDataSuccess());
        })
        .catch((err: DefaultAxiosError) => {
            dispatch(setDataError(err.response?.data.message || 'Ошибка при получении данных'));
        });
};

export const loadVariablesTypes = () => (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    if (state.callersBaseView.variablesTypes && state.callersBaseView.statusesVariables.isSuccess) return;

    dispatch(setVariablesLoading());
    getVariablesTypes()
        .then(res => {
            dispatch(setVariables(res.data));
            dispatch(setVariablesSuccess());
        })
        .catch((err: DefaultAxiosError) => {
            dispatch(setVariablesError(err.response?.data.message || 'Ошибка при получении данных'));
        })
};

export const changeCallersBaseHeaderById = (data: CallersBaseHeaderModel) => (dispatch: Dispatch) => {
    dispatch(setHeaderLoading());
    putCallersBaseHeaderById(data.id, data)
        .then(res => {
            dispatch(setHeader(res.data));
            dispatch(setHeaderSuccess());
        })
        .catch((err: DefaultAxiosError) => {
            dispatch(setHeaderError(err.response?.data.message || 'Ошибка при отправке'))
        });
};

export const {
    resetDataStatuses,
    resetHeaderStatuses,
    setDataError,
    setDataSuccess,
    setHeaderError,
    pushDataPage,
    setHeaderLoading,
    setHeaderSuccess,
    resetPage,
    setDataLoading,
    setHeader,
    setVariables,
    setPage,
    resetAll,
    setLastPage,
    resetVariablesStatuses,
    setVariablesError,
    setVariablesLoading,
    setVariablesSuccess,
    resetData,
    setType
} = callersBaseViewSlice.actions;

export const callersBaseViewReducer = callersBaseViewSlice.reducer;
