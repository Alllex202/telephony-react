import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import listStyles from 'shared/styles/body-list/styles.module.scss'
import './styles.scss'
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material'
import Icon from 'components/ui-kit/icon'
import CallingCard from 'modules/calling/list/body/components/card'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {callingStatuses, CallingStatuses} from 'core/api'
import {getCallingsByPage} from 'store/features/calling/list'
import BtnSecond from 'components/ui-kit/btn-second'

type Props = {
    callingStatus: CallingStatuses,
}

const CallingSection = ({callingStatus}: Props) => {
    const store = useSelector((state: RootState) => state.callingList)
    const filter = useSelector((state: RootState) => state.filter)
    const dispatch = useDispatch()
    const [isOpened, setOpen] = useState<boolean>(false)

    useEffect(() => {
        getData(store[callingStatus].page, callingStatus)
        // eslint-disable-next-line
    }, [filter])

    const loadNextPage = () => {
        if (store[callingStatus].isLastPage || store[callingStatus].statuses.isLoading) return

        getData(store[callingStatus].page + 1, callingStatus)
    }

    const getData = (page: number, callingStatus: CallingStatuses) => {
        dispatch(getCallingsByPage(callingStatus, {
                page,
                size: store[callingStatus].size,
                direction: filter.direction,
                name: filter.name,
                sortBy: filter.sortBy,
                status: callingStatus
            }
        ))
    }

    const onOpen = (event: React.SyntheticEvent, expanded: boolean) => {
        if (!store[callingStatus].statuses.isSuccess) return

        setOpen(expanded)
    }

    return (
        <>
            <Accordion square={true}
                       className={'calling-section'}
                       expanded={store[callingStatus].statuses.isSuccess && store[callingStatus].callingList.length > 0
                                 ? (callingStatus === 'DONE' ? true : isOpened)
                                 : false}
                       onChange={onOpen}>
                <AccordionSummary expandIcon={callingStatus === 'DONE' || store[callingStatus].callingList.length < 1
                                              ? null : <Icon name={'expand_more'}
                                                             type={'round'}
                                                             className={styles.expandIcon}/>}>
                    {callingStatuses[callingStatus].message} ({store[callingStatus].callingList.length})
                </AccordionSummary>
                <AccordionDetails>
                    <div className={listStyles.list}>
                        {store[callingStatus].callingList.map(el => <CallingCard key={el.id}
                                                                                 data={el}
                                                                                 callingStatus={callingStatus}/>)}
                    </div>
                    {!store[callingStatus].isLastPage && !store[callingStatus].statuses.isLoading &&
                    <BtnSecond className={styles.more}
                               onClick={loadNextPage}
                               text={'Показать больше'}/>}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default CallingSection
