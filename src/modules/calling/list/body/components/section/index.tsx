import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import listStyles from 'shared/styles/body-list/styles.module.scss'
import './styles.scss'
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material'
import Icon from 'components/ui-kit/icon'
import CallingCard from 'modules/calling/list/body/components/card'
import {useDispatch} from 'react-redux'
import {CallingStatusTypes} from 'core/api'
import BtnSecond from 'components/ui-kit/btn-second'
import {callingStatuses} from 'shared/data'
import {useSelectorApp} from 'shared/hoocks'
import {getCallingsPage, resetCallingStates as clearData} from 'store/calling/list'
import {RequestPageTypes} from 'shared/types'

type Props = {
    callingStatus: CallingStatusTypes
}

const CallingSection = ({callingStatus}: Props) => {
    const dispatch = useDispatch()
    const {callingList: store} = useSelectorApp()
    const {
        callingList,
        statuses,
        pageSettings: {page, size, isLastPage, totalElements}
    } = store[callingStatus]
    const [isOpened, setOpen] = useState<boolean>(false)

    const loadNextPage = () => {
        if (isLastPage || statuses.isLoading) return

        dispatch(getCallingsPage(callingStatus, RequestPageTypes.Next))
    }

    const onOpen = (event: React.SyntheticEvent, expanded: boolean) => {
        if (!statuses.isSuccess) return

        setOpen(expanded)
    }

    useEffect(() => {
        dispatch(getCallingsPage(callingStatus, RequestPageTypes.First))

        return () => {
            dispatch(clearData(callingStatus))
        }
    }, [])

    return (
        <>
            <Accordion
                square={true}
                className={'calling-section'}
                expanded={
                    statuses.isSuccess && callingList.length > 0
                        ? callingStatus === 'DONE'
                            ? true
                            : isOpened
                        : false
                }
                onChange={onOpen}
            >
                <AccordionSummary
                    expandIcon={
                        callingStatus === 'DONE' || callingList.length < 1 ? null : (
                            <Icon
                                iconName={'expand_more'}
                                iconType={'round'}
                                className={styles.expandIcon}
                            />
                        )
                    }
                >
                    {callingStatuses[callingStatus].message} ({totalElements})
                </AccordionSummary>
                <AccordionDetails>
                    <div className={listStyles.list}>
                        {callingList.map((el) => (
                            <CallingCard key={el.id} data={el} callingStatus={callingStatus} />
                        ))}
                    </div>
                    {!isLastPage && !statuses.isLoading && (
                        <BtnSecond
                            className={styles.more}
                            onClick={loadNextPage}
                            text={'Показать больше'}
                        />
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default CallingSection
