import React from 'react'
import {resetCallersBasesStates} from 'store/callers-bases/list'
import SearchHeader from 'components/search-header'
import {useHistory} from 'react-router-dom'
import {useSelectorApp} from 'shared/hoocks'
import {useDispatch} from 'react-redux'
import {routes} from 'routing/routes'

const CallersBaseListHeader = () => {
    const {
        callersBaseList: {statuses}
    } = useSelectorApp()
    const dispatch = useDispatch()
    const history = useHistory()

    const handlerCreate = () => {
        history.push(routes.callersBase.add())
    }

    const handlerSortItem = () => {
        if (statuses.isLoading) return

        dispatch(resetCallersBasesStates())
    }

    const handlerSearch = () => {
        if (statuses.isLoading) return

        dispatch(resetCallersBasesStates())
    }

    return (
        <SearchHeader
            onSortItem={handlerSortItem}
            onSearch={handlerSearch}
            onLeftBtn={handlerCreate}
            textLeftBtn={'Добавить базу'}
            iconLeftBtn={'upload'}
        />
    )
}

export default CallersBaseListHeader
