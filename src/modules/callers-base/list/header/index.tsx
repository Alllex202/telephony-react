import React from 'react'
import {getCallersBases} from 'store/callers-bases/list'
import SearchHeader from 'components/search-header'
import {useHistory} from 'react-router-dom'
import {useSelectorApp} from 'shared/hoocks'
import {useDispatch} from 'react-redux'
import {routes} from 'routing/routes'
import {RequestPageTypes} from 'shared/types'

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
        dispatch(getCallersBases(RequestPageTypes.First))
    }

    const handlerSearch = () => {
        dispatch(getCallersBases(RequestPageTypes.First))
    }

    return (
        <SearchHeader
            onSortItem={handlerSortItem}
            onSearch={handlerSearch}
            onLeftBtn={handlerCreate}
            textLeftBtn={'Добавить базу'}
            iconLeftBtn={'upload'}
            isLoading={statuses.isLoading ?? false}
        />
    )
}

export default CallersBaseListHeader
