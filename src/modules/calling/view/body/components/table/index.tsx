import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import stylesTable from 'shared/styles/table/styles.module.scss'
import {useDispatch} from 'react-redux'
import {
    getCallingResultTableBodyById,
    getCallingResultTableHeaderById,
    getVariables,
    resetCallingViewState
} from 'store/calling/view'
import {useSelectorApp} from 'shared/hoocks'
import {useParams} from 'react-router-dom'
import {RequestPageTypes} from 'shared/types'
import {AutoSizer, GridCellProps, Index, MultiGrid, OnScrollParams, Size} from 'react-virtualized'
import {classNames} from 'shared/utils'

const CallingViewTable = React.memo(() => {
    const dispatch = useDispatch()
    const {
        callingView: {tableHeader, tableBody, variables}
    } = useSelectorApp()
    const {callingId} = useParams<{callingId: string}>()

    const handlerScroll = ({scrollHeight, scrollTop, clientHeight}: OnScrollParams) => {
        if (
            tableBody.status.isLoading ||
            tableBody.pageSettings.isLastPage ||
            scrollTop + (48 * tableBody.pageSettings.size) / 2 + clientHeight < scrollHeight
        )
            return

        dispatch(getCallingResultTableBodyById(callingId, RequestPageTypes.Next))
    }

    const cellRenderer = ({rowIndex, columnIndex, key, style}: GridCellProps) => {
        const classNameCellList: string[] = [stylesTable.cell]

        if ((rowIndex + 1) % 2 === 0) {
            classNameCellList.push(stylesTable.even)
        } else {
            classNameCellList.push(stylesTable.odd)
        }

        if (rowIndex === 0 && columnIndex === 0) {
            return <div key={key} style={style} className={classNames(...classNameCellList)} />
        }

        if (rowIndex === 0) {
            if (!tableHeader.data) return <></>

            if (columnIndex - 1 < tableHeader.data.extra.length) {
                const el = tableHeader.data.extra[columnIndex - 1]

                return (
                    <div key={key} style={style} className={classNames(...classNameCellList)}>
                        <div className={stylesTable.variable}>
                            <div className={stylesTable.type}>&nbsp;</div>
                            <div className={styles.name}>{el.currentName}</div>
                        </div>
                    </div>
                )
            } else {
                const el =
                    tableHeader.data.original[columnIndex - tableHeader.data.extra.length - 1]

                return (
                    <div key={key} style={style} className={classNames(...classNameCellList)}>
                        <div className={stylesTable.variable}>
                            <div className={stylesTable.type}>
                                <span className={stylesTable.text}>
                                    {variables.data.find((e) => e.name === el.type)?.description ??
                                        ''}
                                </span>
                            </div>
                            <div className={styles.name}>{el.currentName}</div>
                        </div>
                    </div>
                )
            }
        }

        if (columnIndex === 0) {
            classNameCellList.push(stylesTable.number)

            return (
                <div key={key} style={style} className={classNames(...classNameCellList)}>
                    {rowIndex}
                </div>
            )
        }

        const rowDate = tableBody.data[rowIndex - 1]

        if (!rowDate) {
            return <div key={key} style={style} className={classNames(...classNameCellList)} />
        }

        if (!tableHeader.data) return <></>

        if (columnIndex - 1 < tableHeader.data.extra.length) {
            const variable = rowDate.extra[columnIndex - 1]

            if (!variable.valid) {
                classNameCellList.push(stylesTable.invalidCell)
            }

            return (
                <div key={key} style={style} className={classNames(...classNameCellList)}>
                    {variable.value}
                </div>
            )
        } else {
            const variable = rowDate.original[columnIndex - tableHeader.data.extra.length - 1]

            if (!variable.valid) {
                classNameCellList.push(stylesTable.invalidCell)
            }

            return (
                <div key={key} style={style} className={classNames(...classNameCellList)}>
                    {variable.value}
                </div>
            )
        }
    }

    const getColumnWidth = ({index}: Index) => {
        return index === 0 ? 100 : 230
    }

    const getRowHeight = ({index}: Index) => {
        return index === 0 ? 88 : 48
    }

    const getColumnCount = (): number => {
        return (tableHeader.data?.extra.length ?? 0) + (tableHeader.data?.original.length ?? 0) + 1
    }

    const renderMultiGrid = ({width}: Size) => (
        <MultiGrid
            cellRenderer={cellRenderer}
            onScroll={handlerScroll}
            columnWidth={getColumnWidth}
            columnCount={getColumnCount()}
            fixedColumnCount={1}
            fixedRowCount={1}
            height={700}
            rowHeight={getRowHeight}
            rowCount={Math.max(tableBody.data.length + 1, 16)}
            width={width}
        />
    )

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
                <div className={stylesTable.table}>
                    <AutoSizer disableHeight>{renderMultiGrid}</AutoSizer>
                </div>
            )}
        </>
    )
})

export default CallingViewTable
