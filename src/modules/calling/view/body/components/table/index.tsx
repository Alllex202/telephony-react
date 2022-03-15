import React, {useEffect} from 'react'
import styles from 'shared/styles/table/styles.module.scss'
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
import HiddenInput from 'components/ui-kit-v2/hidden-input'

const CallingViewTable = () => {
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
        const classNameCellList: string[] = [styles.cell]

        if ((rowIndex + 1) % 2 === 0) {
            classNameCellList.push(styles.even)
        } else {
            classNameCellList.push(styles.odd)
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
                        <div className={styles.variable}>
                            <div className={styles.type}>&nbsp;</div>
                            <div className={styles.name}>
                                <HiddenInput value={el.currentName} disabled />
                            </div>
                        </div>
                    </div>
                )
            } else {
                const el =
                    tableHeader.data.original[columnIndex - tableHeader.data.extra.length - 1]

                return (
                    <div key={key} style={style} className={classNames(...classNameCellList)}>
                        <div className={styles.variable}>
                            <div className={styles.type}>
                                <span className={styles.text}>
                                    {variables.data.find((e) => e.name === el.type)?.description ??
                                        ''}
                                </span>
                            </div>
                            <div className={styles.name}>
                                <HiddenInput value={el.currentName} disabled prefix={'#'} />
                            </div>
                        </div>
                    </div>
                )
            }
        }

        if (columnIndex === 0) {
            classNameCellList.push(styles.number)

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

            if (!variable.isValid) {
                classNameCellList.push(styles.invalidCell)
            }

            return (
                <div key={key} style={style} className={classNames(...classNameCellList)}>
                    {variable.value}
                </div>
            )
        } else {
            const variable = rowDate.original[columnIndex - tableHeader.data.extra.length - 1]

            if (!variable.isValid) {
                classNameCellList.push(styles.invalidCell)
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
                <div className={styles.table}>
                    <AutoSizer disableHeight>{renderMultiGrid}</AutoSizer>
                </div>
            )}
        </>
    )
}

export default CallingViewTable
