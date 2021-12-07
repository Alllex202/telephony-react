import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {ScenarioInfoModel} from "core/api";
import {FetchStatuses} from "shared/types/fetch-statuses";
import {AxiosRequestConfig} from "axios";
import {DefaultAxiosError} from "shared/types/base-response-error";
import {DirectionSort, SortType} from 'shared/data/sort-items';
import {ParamsPaginatorWithFilterModel} from 'core/api/models';
import {getScenariosByPage as getScenarios} from 'core/api/requests'

export interface ScenariosState {
    scenarioList: ScenarioInfoModel[],
    error: string,
    statuses: FetchStatuses,
    page: number,
    size: number,
    isLastPage: boolean,
}

const initialState: ScenariosState = {
    scenarioList: [],
    error: '',
    statuses: {isLoading: false, isError: false, isSuccess: false},
    page: 0,
    size: 10,
    isLastPage: false,
}

export const scenarioListSlice = createSlice({
    name: 'scenarios',
    initialState,
    reducers: {
        addScenarios: (state, action: PayloadAction<ScenarioInfoModel[]>) => {
            state.scenarioList = [...state.scenarioList, ...action.payload];
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        resetScenarios: (state) => {
            state.scenarioList = [];
        },
        deleteScenarioById: (state, action: PayloadAction<number | string>) => {
            state.scenarioList = state.scenarioList.filter(el => el.id !== action.payload);
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.statuses = {isError: true};
        },
        resetError: (state) => {
            state.error = '';
        },
        setLoading: (state) => {
            state.statuses = {isLoading: true};
        },
        setSuccess: (state) => {
            state.statuses = {isSuccess: true};
        },
        resetStatuses: (state) => {
            state.statuses = {isLoading: false, isError: false, isSuccess: false};
        },
        resetScenariosStates: (state) => {
            state.statuses = {isLoading: false, isError: false, isSuccess: false};
            state.error = '';
            state.scenarioList = [];
            state.page = 0;
            state.size = initialState.size;
            state.isLastPage = false;
        },
        setLastPage: (state, action: PayloadAction<boolean>) => {
            state.isLastPage = action.payload;
        },
    },
});

export const getScenariosByPage =
    (params: ParamsPaginatorWithFilterModel<SortType, DirectionSort>, otherConfig?: AxiosRequestConfig) =>
        (dispatch: Dispatch) => {
            dispatch(setLoading());
            getScenarios(params, otherConfig)
                .then((res) => {
                    dispatch(addScenarios(res.data.content))
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


export const {
    addScenarios,
    // resetScenarios,
    // resetStatuses,
    // resetError,
    setError,
    deleteScenarioById,
    setSuccess,
    resetScenariosStates,
    setLoading,
    setLastPage,
    setPage,
} = scenarioListSlice.actions;

export const scenarioListReducers = scenarioListSlice.reducer;
