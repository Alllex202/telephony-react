import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'
import {FetchStatuses} from 'shared/types/fetch-statuses'
import {RootState} from 'store/index'
import {createCalling, getCallingById, updateCalling} from 'core/api/requests/calling'
import {DefaultAxiosError} from 'shared/types/base-response-error'
import {enqueueSnackbar} from 'store/features/notifications'
import {handlerError} from 'shared/middleware'
import {CallingModel, CallingRequestModel} from 'core/api'
import {goBack} from 'connected-react-router'

interface CreatingState {
    callersBaseId?: number | string | null
    id?: number | string | null
    name: string
    scenarioId?: number | string | null
    startDate?: number | null
    isNow: boolean
    statuses: FetchStatuses
}

const initialState: CreatingState = {
    name: 'Новое обзванивание',
    isNow: false,
    statuses: {}
}

const callingCreatingSlice = createSlice({
    name: 'callingCreating',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.statuses = {isLoading: true}
        },
        setSuccess: (state) => {
            state.statuses = {isSuccess: true}
        },
        setIsNow: (state, action: PayloadAction<boolean>) => {
            state.isNow = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.statuses = {isError: true, error: action.payload}
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setScenarioId: (state, action: PayloadAction<number | string | null>) => {
            state.scenarioId = action.payload
        },
        setCallersBaseId: (state, action: PayloadAction<number | string | null>) => {
            state.callersBaseId = action.payload
        },
        setStartDate: (state, action: PayloadAction<number | null | undefined>) => {
            state.startDate = action.payload
        },
        setCalling: (state, action: PayloadAction<CallingModel>) => {
            state.isNow = action.payload.status !== 'SCHEDULED'
            state.callersBaseId = action.payload.callersBase.id
            state.name = action.payload.name
            state.scenarioId = action.payload.scenario.id
            state.startDate = action.payload.startDate
            state.id = action.payload.id
        },
        resetState: (state) => {
            state.statuses = {}
            state.callersBaseId = undefined
            state.name = 'Новое обзванивание'
            state.scenarioId = undefined
            state.startDate = undefined
            state.isNow = false
            state.id = null
        }
    }
})

export const saveCalling = () => (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState().callingCreating
    if (state.statuses.isLoading || !state.name || !state.callersBaseId || !state.scenarioId) return

    dispatch(setLoading())
    const data: CallingRequestModel = {
        id: state.id ?? null,
        name: state.name,
        callersBase: {id: state.callersBaseId},
        scenario: {id: state.scenarioId},
        startDate: state.isNow ? null : state.startDate,
        status: state.isNow ? 'RUN' : 'SCHEDULED'
    }

    if (state.id) {
        updateCalling(state.id, data)
            .then((res) => {
                dispatch(setSuccess())
                dispatch(enqueueSnackbar({message: 'Обзванивание обновлено', type: 'SUCCESS'}))
                dispatch(goBack())
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    dispatch(
                        setError(err.response?.data.message || 'Ошибка при обновлении обзвона')
                    )
                })
            )
    } else {
        createCalling(data)
            .then((res) => {
                dispatch(setSuccess())
                dispatch(enqueueSnackbar({message: 'Обзванивание создано', type: 'SUCCESS'}))
                dispatch(goBack())
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    dispatch(
                        setError(err.response?.data.message || 'Ошибка при сохранении обзвона')
                    )
                })
            )
    }
}

export const getCalling = (id: number | string) => (dispatch: Dispatch) => {
    getCallingById(id)
        .then((res) => {
            dispatch(setCalling(res.data))
        })
        .catch(handlerError(dispatch))
}

export const {
    setScenarioId,
    setCallersBaseId,
    setName,
    resetState,
    setSuccess,
    setLoading,
    setError,
    setStartDate,
    setIsNow,
    setCalling
} = callingCreatingSlice.actions

export const callingCreatingReducers = callingCreatingSlice.reducer
