import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import stylesTable from 'shared/styles/table/styles.module.scss'
import 'shared/styles/table/styles.scss'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {Table, TableBody, TableCell, TableHead, TableRow as MuiTableRow} from '@mui/material'
import {CallingResultTableBody} from 'core/api'
import {getCallingResultTableBodyById, getCallingResultTableHeaderById, getVariables} from 'store/features/calling/view'
import Icon from 'components/ui-kit/icon'

type Props = {
    callingId: string
}

const CallingViewTable = React.memo(({callingId}: Props) => {
    const dispatch = useDispatch()
    const {tableHeader, tableBody, variables} = useSelector((state: RootState) => state.callingView)

    useEffect(() => {
        dispatch(getCallingResultTableHeaderById(callingId))
        dispatch(getCallingResultTableBodyById(callingId, {page: 0, size: tableBody.size}))
        if (!variables.result) {
            dispatch(getVariables())
        }
    }, [])

    function handlerScroll(e: React.UIEvent<HTMLDivElement>) {
        if (tableBody.status.isLoading || tableHeader.status.isLoading) return
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight + 500 < e.currentTarget.scrollHeight) return
        if (tableBody.isLastPage) return
        if (!tableHeader.result) return

        dispatch(getCallingResultTableBodyById(callingId, {page: tableBody.page, size: tableBody.size}))
    }

    return (
        <>
            {
                tableHeader.result &&
                variables.result &&
                <div className={stylesTable.wrapper}
                     onScroll={handlerScroll}>
                    <Table stickyHeader
                           className={'data-view'}>
                        <TableHead>
                            <MuiTableRow>
                                <TableCell></TableCell>
                                {tableHeader.result?.extra?.map((el, ind) =>
                                    <TableCell key={`extra-${el.id}`}>
                                        <div className={stylesTable.variable}>
                                            <div className={stylesTable.type}>&nbsp;</div>
                                            <div className={styles.name}>
                                                {el.currentName}
                                            </div>
                                        </div>
                                    </TableCell>)}
                                {tableHeader.result?.original?.map((el, ind) =>
                                    <TableCell key={`original-${el.id}`}>
                                        <div className={stylesTable.variable}>
                                            <div className={stylesTable.type}>
                                            <span className={stylesTable.text}>
                                                {
                                                    variables.result &&
                                                    variables.result.find((e) => e.name === el.type)?.description
                                                }
                                            </span>
                                            </div>
                                            <div className={styles.name}>
                                                {el.currentName}
                                            </div>
                                        </div>
                                    </TableCell>)}
                            </MuiTableRow>
                        </TableHead>
                        <TableBody>
                            {tableBody.result?.map((el, ind) =>
                                <TableRow key={el.number}
                                          el={el}
                                          ind={ind}/>)}
                        </TableBody>
                    </Table>
                </div>
            }
        </>
    )
})

type PropsRow = {
    ind: number,
    el: CallingResultTableBody,
}

const TableRow = React.memo(({el, ind}: PropsRow) => {
    return (
        <MuiTableRow key={el.number}>
            <TableCell>{el.number}</TableCell>
            {
                el.extra.map(el =>
                    <TableCell key={`extra-${el.id}`}
                               className={!el.valid ? stylesTable.invalidCell : ''}>
                        {el.value}
                    </TableCell>
                )
            }
            {el.original.map(el =>
                <TableCell key={`original-${el.id}`}
                           className={!el.valid ? stylesTable.invalidCell : ''}>
                    {el.value}
                </TableCell>
            )}
        </MuiTableRow>
    )
})

export default CallingViewTable
