import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import stylesTable from 'shared/styles/table/styles.module.scss'
import 'shared/styles/table/styles.scss'
import {useDispatch} from 'react-redux'
import {Table, TableBody, TableCell, TableHead, TableRow as MuiTableRow} from '@mui/material'
import {
    getCallingResultTableBodyById,
    getCallingResultTableHeaderById,
    getVariables,
    resetCallingViewState
} from 'store/calling/view'
import {useSelectorApp} from 'shared/hoocks'
import TableRow from 'modules/calling/view/body/components/table/components/table-row'
import {useParams} from 'react-router-dom'
import {RequestPageTypes} from 'shared/types'

const CallingViewTable = React.memo(() => {
    const dispatch = useDispatch()
    const {
        callingView: {tableHeader, tableBody, variables}
    } = useSelectorApp()
    const {callingId} = useParams<{callingId: string}>()

    const handlerScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (
            tableBody.status.isLoading ||
            tableBody.pageSettings.isLastPage ||
            e.currentTarget.scrollTop + e.currentTarget.clientHeight + 500 <
                e.currentTarget.scrollHeight
        )
            return

        dispatch(getCallingResultTableBodyById(callingId, RequestPageTypes.Next))
    }

    useEffect(() => {
        if (!variables.status.isSuccess) {
            dispatch(getVariables())
        }
        dispatch(getCallingResultTableHeaderById(callingId))
        dispatch(getCallingResultTableBodyById(callingId, RequestPageTypes.First))

        return () => {
            dispatch(resetCallingViewState({type: 'tableBody'}))
            dispatch(resetCallingViewState({type: 'tableHeader'}))
        }
    }, [callingId])

    return (
        <>
            {variables.status.isSuccess && tableHeader.status.isSuccess && (
                <div className={stylesTable.wrapper} onScroll={handlerScroll}>
                    <Table stickyHeader className={'data-view'}>
                        <TableHead>
                            <MuiTableRow>
                                <TableCell />
                                {tableHeader.data?.extra?.map((el) => (
                                    <TableCell key={`extra-${el.id}`}>
                                        <div className={stylesTable.variable}>
                                            <div className={stylesTable.type}>&nbsp;</div>
                                            <div className={styles.name}>{el.currentName}</div>
                                        </div>
                                    </TableCell>
                                ))}
                                {tableHeader.data?.original?.map((el) => (
                                    <TableCell key={`original-${el.id}`}>
                                        <div className={stylesTable.variable}>
                                            <div className={stylesTable.type}>
                                                <span className={stylesTable.text}>
                                                    {
                                                        variables.data.find(
                                                            (e) => e.name === el.type
                                                        )?.description
                                                    }
                                                </span>
                                            </div>
                                            <div className={styles.name}>{el.currentName}</div>
                                        </div>
                                    </TableCell>
                                ))}
                            </MuiTableRow>
                        </TableHead>
                        <TableBody>
                            {tableBody.data?.map((el) => (
                                <TableRow key={el.number} el={el} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    )
})

export default CallingViewTable
