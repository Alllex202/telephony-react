import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {routes} from 'routing/routes'
import {resetScenariosStates} from 'store/scenario/list'
import {createScenario} from 'core/api/requests'
import {DefaultAxiosError} from 'shared/types/base-response-error'
import {FetchStatuses} from 'shared/types/fetch-statuses'
import {enqueueSnackbar} from 'features/notifications/store'
import {handlerError} from 'shared/middleware'
import {useSelectorApp} from 'shared/hoocks'
import SearchHeader from 'components/search-header'

const ScenarioListHeader = () => {
    const {
        scenarioList: {statuses}
    } = useSelectorApp()
    const [creating, setCreating] = useState<FetchStatuses>({})
    const dispatch = useDispatch()
    const history = useHistory()

    const handlerCreate = () => {
        if (creating.isLoading) return

        setCreating({isLoading: true})
        createScenario('Новый сценарий')
            .then((res) => {
                history.push(routes.scenario.view(res.data.id))
                dispatch(enqueueSnackbar({message: 'Создан новый сценарий', type: 'SUCCESS'}))
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    setCreating({
                        isError: true,
                        error: err.response?.data.message || 'Ошибка при создании'
                    })
                })
            )
    }

    const handlerSortItem = () => {
        if (statuses.isLoading) return

        dispatch(resetScenariosStates())
    }

    const handlerSearch = () => {
        if (statuses.isLoading) return

        dispatch(resetScenariosStates())
    }

    return (
        <SearchHeader
            onSortItem={handlerSortItem}
            onSearch={handlerSearch}
            textLeftBtn={'Создать сценарий'}
            onLeftBtn={handlerCreate}
            iconLeftBtn={'format_list_numbered'}
        />
    )
}

export default ScenarioListHeader
