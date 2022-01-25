import React, {useEffect} from 'react'
import bodyStyles from 'shared/styles/body-list/styles.module.scss'
import {useDispatch} from 'react-redux'
import {getCallersBases, resetCallersBasesStates as clearData} from 'store/callers-bases/list'
import CallersBaseCard from './components/card'
import BtnSecond from 'components/ui-kit/btn-second'
import {useSelectorApp} from 'shared/hoocks'
import {RequestPageTypes} from 'shared/types'

const CallersBaseListBody = () => {
    const dispatch = useDispatch()
    const {
        callersBaseList: {
            callersBaseList,
            statuses,
            pageSettings: {page, isLastPage, size}
        }
    } = useSelectorApp()

    const loadNextPage = () => {
        if (isLastPage || statuses.isLoading) return

        dispatch(getCallersBases(RequestPageTypes.Next))
    }

    useEffect(() => {
        dispatch(getCallersBases(RequestPageTypes.First))

        return () => {
            dispatch(clearData())
        }
    }, [])

    return (
        <>
            <div className={bodyStyles.list}>
                {callersBaseList.map((el) => (
                    <CallersBaseCard key={el.id} data={el} className={bodyStyles.card} />
                ))}
            </div>

            <div className={bodyStyles.footer}>
                {!isLastPage && (statuses.isSuccess || statuses.isError) && (
                    <BtnSecond
                        className={bodyStyles.more}
                        onClick={loadNextPage}
                        text={'Показать больше'}
                    />
                )}
            </div>
        </>
    )
}

export default CallersBaseListBody
