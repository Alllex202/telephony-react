import React from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {routes} from 'routing/routes'
import {useSelectorApp} from 'shared/hoocks'
import SearchHeader from 'components/search-header'
import {resetCallingStates} from 'store/calling/list'

const CallingListHeader = () => {
    const {callingList} = useSelectorApp()
    const dispatch = useDispatch()
    const history = useHistory()

    const handlerCreate = () => {
        history.push(routes.calling.create())
    }

    const handlerSortItem = () => {
        if (
            callingList['RUN'].statuses.isLoading ||
            callingList['SCHEDULED'].statuses.isLoading ||
            callingList['DONE'].statuses.isLoading
        )
            return

        dispatch(resetCallingStates())
    }

    const handlerSearch = () => {
        if (
            callingList['RUN'].statuses.isLoading ||
            callingList['SCHEDULED'].statuses.isLoading ||
            callingList['DONE'].statuses.isLoading
        )
            return

        dispatch(resetCallingStates())
    }

    return (
        <SearchHeader
            onSortItem={handlerSortItem}
            onSearch={handlerSearch}
            textLeftBtn={'Обзванивание'}
            onLeftBtn={handlerCreate}
            iconLeftBtn={'add_ic_call'}
        />
    )
}

export default CallingListHeader
