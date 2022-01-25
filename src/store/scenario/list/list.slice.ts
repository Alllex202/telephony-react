import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {getScenariosByPage, ParamsPaginatorWithFilterModel, ScenarioInfoModel} from 'core/api'
import {DefaultAxiosError, FetchStatuses, PageSettings, RequestPageTypes} from 'shared/types'
import {RootState} from 'store/index'
import {DirectionSort, SortType} from 'shared/data'
import {handlerError} from 'shared/middleware'
import {IdKey} from 'shared/types/id-key'

interface ScenariosState {
    scenarioList: ScenarioInfoModel[]
    statuses: FetchStatuses
    pageSettings: PageSettings
}

const initialState: ScenariosState = {
    scenarioList: [],
    statuses: {},
    pageSettings: {page: 0, isLastPage: false, size: 10}
}

export const scenarioListSlice = createSlice({
    name: 'scenarios',
    initialState,
    reducers: {
        updatePageSettings: (
            state,
            action: PayloadAction<Partial<Pick<PageSettings, 'isLastPage' | 'page'>>>
        ) => {
            state.pageSettings = {...state.pageSettings, ...action.payload}
        },
        setError: (state, action: PayloadAction<string>) => {
            state.statuses = {isError: true, error: action.payload}
        },
        setLoading: (state) => {
            state.statuses = {isLoading: true}
        },
        setSuccess: (state) => {
            state.statuses = {isSuccess: true}
        },
        addScenarios: (state, action: PayloadAction<ScenarioInfoModel[]>) => {
            state.scenarioList = [...state.scenarioList, ...action.payload]
        },
        deleteScenarioById: (state, action: PayloadAction<IdKey>) => {
            state.scenarioList = state.scenarioList.filter((el) => el.id !== action.payload)
        },
        resetScenariosStates: (state) => {
            state.statuses = {}
            state.scenarioList = []
            state.pageSettings = {page: 0, isLastPage: false, size: state.pageSettings.size}
        }
    }
})

export const getScenariosPage =
    (type: RequestPageTypes) => (dispatch: Dispatch, getState: () => RootState) => {
        const {
            scenarioList: {
                pageSettings: {page, size}
            },
            filter: {name, sortBy, direction}
        } = getState()

        const params: ParamsPaginatorWithFilterModel<SortType, DirectionSort> = {
            page: page + 1,
            size,
            name,
            sortBy,
            direction
        }

        if (type === RequestPageTypes.First) {
            params.page = 0
            dispatch(resetScenariosStates())
        }

        dispatch(setLoading())
        getScenariosByPage(params)
            .then((res) => {
                dispatch(addScenarios(res.data.content))
                dispatch(
                    updatePageSettings({
                        isLastPage: res.data.last,
                        page: res.data.pageable.pageNumber
                    })
                )
                dispatch(setSuccess())
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    dispatch(setError(err.response?.data.error || 'getScenariosPage'))
                })
            )
    }

export const {
    addScenarios,
    setError,
    deleteScenarioById,
    setSuccess,
    resetScenariosStates,
    setLoading,
    updatePageSettings
} = scenarioListSlice.actions

export const scenarioListReducers = scenarioListSlice.reducer
