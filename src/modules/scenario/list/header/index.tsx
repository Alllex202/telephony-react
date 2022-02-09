import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {routes} from 'routing/routes'
import {getScenariosPage} from 'store/scenario/list'
import {createScenario} from 'core/api'
import {DefaultAxiosError, FetchStatuses, RequestPageTypes} from 'shared/types'
import {enqueueSnackbar} from 'features/notifications/store'
import {handlerError} from 'shared/middleware'
import {useSelectorApp} from 'shared/hoocks'
import SearchHeader from 'components/search-header'
import {FormatListNumberedRounded} from '@mui/icons-material'

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
                        error: err.response?.data.message || 'handlerCreate'
                    })
                })
            )
    }

    const handlerSortItem = () => {
        dispatch(getScenariosPage(RequestPageTypes.First))
    }

    const handlerSearch = () => {
        dispatch(getScenariosPage(RequestPageTypes.First))
    }

    return (
        <SearchHeader
            onSortItem={handlerSortItem}
            onSearch={handlerSearch}
            textLeftBtn={'Создать сценарий'}
            onLeftBtn={handlerCreate}
            iconLeftBtn={<FormatListNumberedRounded />}
            isLoading={statuses.isLoading ?? false}
        />
    )
}

export default ScenarioListHeader
