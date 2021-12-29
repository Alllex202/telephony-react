import React, {useEffect} from 'react'
import bodyStyles from 'shared/styles/body-list/styles.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {getCallersBasesByPage, resetCallersBasesStates as clearData} from 'store/features/callers-bases/list'
import CallersBaseCard from './components/card'
import BtnSecond from 'components/ui-kit/btn-second'

function CallersBaseListBody() {
    const {
        callersBaseList,
        statuses,
        error,
        page,
        size,
        isLastPage
    } = useSelector((state: RootState) => state.callersBaseList)
    const filter = useSelector((state: RootState) => state.filter)

    const dispatch = useDispatch()

    const loadNextPage = () => {
        if (isLastPage || statuses.isLoading) return

        getData(page + 1)
    }

    useEffect(() => {
        getData(page)
        // eslint-disable-next-line
    }, [filter])

    function getData(page: number) {
        dispatch(getCallersBasesByPage({
                page,
                size,
                direction: filter.direction,
                name: filter.name,
                sortBy: filter.sortBy
            }
        ))
    }

    useEffect(() => {
        return () => {
            dispatch(clearData())
        }
        // eslint-disable-next-line
    }, [])

    if (callersBaseList.length < 1 && statuses.isLoading) {
        return <h1>Загрузка...</h1>
    }

    if (callersBaseList.length < 1 && statuses.isError) {
        return <h1>Ошибка при загрузке | {error}</h1>
    }

    return (
        <>
            {callersBaseList.length < 1
             ? <h1>Здесь пусто :(</h1>
             : <>
                 <div className={bodyStyles.list}>
                     {callersBaseList.map(el =>
                         <CallersBaseCard key={el.id}
                                          data={el}
                                          className={bodyStyles.card}/>
                     )}
                 </div>
             </>
            }

            <div className={bodyStyles.footer}>
                {statuses.isLoading && <h1>Загрузка...</h1>}
                {!isLastPage && !statuses.isLoading &&
                <BtnSecond className={bodyStyles.more}
                           onClick={loadNextPage}
                           text={'Показать больше'}/>}
            </div>
        </>
    )
}

export default CallersBaseListBody

