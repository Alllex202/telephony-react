import React, {useEffect} from 'react'
import bodyStyles from 'shared/styles/body-list/styles.module.scss'
import {useDispatch} from 'react-redux'
import {getCallersBases, resetCallersBasesStates as clearData} from 'store/callers-bases/list'
import CallersBaseCard from './components/card'
import {useSelectorApp} from 'shared/hoocks'
import {RequestPageTypes} from 'shared/types'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'

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
                <BtnSecondary
                    className={
                        !isLastPage && (statuses.isSuccess || statuses.isError) ? '' : 'v-hidden'
                    }
                    onClick={loadNextPage}
                >
                    Показать больше
                </BtnSecondary>
            </div>
        </>
    )
}

export default CallersBaseListBody
