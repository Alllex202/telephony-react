import React from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {routes} from 'routing/routes'
import {useSelectorApp} from 'shared/hoocks'
import SearchHeader from 'components/search-header'
import {getCallingsPage} from 'store/calling/list'
import {RequestPageTypes} from 'shared/types'
import {AddIcCallRounded} from '@mui/icons-material'

const CallingListHeader = () => {
    const {callingList} = useSelectorApp()
    const dispatch = useDispatch()
    const history = useHistory()

    const handlerCreate = () => {
        history.push(routes.calling.create())
    }

    const handlerSortItem = () => {
        dispatch(getCallingsPage('RUN', RequestPageTypes.First))
        dispatch(getCallingsPage('SCHEDULED', RequestPageTypes.First))
        dispatch(getCallingsPage('DONE', RequestPageTypes.First))
    }

    const handlerSearch = () => {
        dispatch(getCallingsPage('RUN', RequestPageTypes.First))
        dispatch(getCallingsPage('SCHEDULED', RequestPageTypes.First))
        dispatch(getCallingsPage('DONE', RequestPageTypes.First))
    }

    return (
        <SearchHeader
            onSortItem={handlerSortItem}
            onSearch={handlerSearch}
            textLeftBtn={'Обзванивание'}
            onLeftBtn={handlerCreate}
            iconLeftBtn={<AddIcCallRounded />}
            isLoading={
                (callingList['RUN'].statuses.isLoading ?? false) ||
                (callingList['SCHEDULED'].statuses.isLoading ?? false) ||
                (callingList['DONE'].statuses.isLoading ?? false)
            }
        />
    )
}

export default CallingListHeader
