import React, {useEffect, useState} from 'react'
import styles from 'shared/styles/table/styles.module.scss'
import {useDispatch} from 'react-redux'
import {
    changeCallersBaseCommon,
    getCallersBaseTableDataPage,
    getVariablesTypes
} from 'store/callers-bases/view'
import {IconButton, Menu, MenuItem} from '@mui/material'
import {CallersBaseHeaderColumnModel, VariableTypeModel} from 'core/api'
import InputVariableName from './components/input-variable-name'
import {useSelectorApp} from 'shared/hoocks'
import {useParams} from 'react-router-dom'
import {RequestPageTypes} from 'shared/types'
import {ArrowDropDownRounded} from '@mui/icons-material'
import {classNames} from 'shared/utils'
import {AutoSizer, GridCellProps, Index, MultiGrid, OnScrollParams, Size} from 'react-virtualized'

const CallersBaseViewTable = () => {
    const dispatch = useDispatch()
    const {
        callersBaseView: {
            variablesTypes,
            table: {
                data,
                statuses,
                pageSettings: {page, isLastPage, size, onlyInvalid}
            },
            common
        }
    } = useSelectorApp()
    const {callersBaseId} = useParams<{callersBaseId: string}>()
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const [selectedVariable, selectVariable] = useState<CallersBaseHeaderColumnModel | null>(null)

    const handlerScroll = ({scrollHeight, scrollTop, clientHeight}: OnScrollParams) => {
        if (
            statuses.isLoading ||
            isLastPage ||
            scrollTop + (48 * size) / 2 + clientHeight < scrollHeight
        )
            return

        dispatch(getCallersBaseTableDataPage(callersBaseId, RequestPageTypes.Next))
    }

    const handlerShowMenuType =
        (variable: CallersBaseHeaderColumnModel) => (e: React.MouseEvent) => {
            if (common.statuses.isLoading) return

            setAnchorEl(e.currentTarget)
            selectVariable(variable)
        }

    const handlerHideMenuType = () => {
        setAnchorEl(null)
        selectVariable(null)
    }

    const handlerChangeVariableType = (newType: VariableTypeModel) => () => {
        if (common.statuses.isLoading || !common.data) return
        if (newType.name === selectedVariable?.type) {
            handlerHideMenuType()
            return
        }

        dispatch(
            changeCallersBaseCommon({
                ...common.data,
                columns: common.data.columns.map((el) =>
                    el.id === selectedVariable?.id ? {...el, type: newType.name} : el
                )
            })
        )
        handlerHideMenuType()
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
            if (!common.data) return <></>
            const el = common.data.columns[columnIndex - 1]
            return (
                <div key={key} style={style} className={classNames(...classNameCellList)}>
                    <div className={styles.variable}>
                        <div className={styles.type}>
                            <span className={styles.text}>
                                {variablesTypes.data.find((e) => e.name === el.type)?.description ??
                                    ''}
                            </span>
                            <IconButton className={styles.btn} onClick={handlerShowMenuType(el)}>
                                <ArrowDropDownRounded
                                    className={classNames(
                                        styles.icon,
                                        !!anchorEl && selectedVariable?.id === el.id
                                            ? styles.active
                                            : ''
                                    )}
                                />
                            </IconButton>
                        </div>
                        <div className={styles.name}>
                            <InputVariableName
                                initState={el.currentName}
                                el={el}
                                conditionSave={!common.statuses.isLoading}
                                data={common.data}
                                disabled={common.statuses.isLoading}
                            />
                        </div>
                    </div>
                </div>
            )
        }

        const rowDate = data[rowIndex - 1]

        if (rowDate && rowDate.variables.some((el) => !el.valid)) {
            classNameCellList.push(styles.invalidRow)
        }

        if (columnIndex === 0) {
            classNameCellList.push(styles.number)

            return (
                <div key={key} style={style} className={classNames(...classNameCellList)}>
                    {rowIndex}
                </div>
            )
        }

        if (!rowDate) {
            return <div key={key} style={style} className={classNames(...classNameCellList)} />
        }

        const variable = rowDate.variables[columnIndex - 1]
        if (!variable.valid) {
            classNameCellList.push(styles.invalidCell)
        }

        return (
            <div key={key} style={style} className={classNames(...classNameCellList)}>
                {variable.value}
            </div>
        )
    }

    const getColumnWidth = ({index}: Index) => {
        return index === 0 ? 100 : 230
    }

    const getRowHeight = ({index}: Index) => {
        return index === 0 ? 88 : 48
    }

    const renderMultiGrid = ({width}: Size) => (
        <MultiGrid
            cellRenderer={cellRenderer}
            onScroll={handlerScroll}
            columnWidth={getColumnWidth}
            columnCount={(common.data?.columns.length ?? 0) + 1}
            fixedColumnCount={1}
            fixedRowCount={1}
            height={700}
            rowHeight={getRowHeight}
            rowCount={Math.max(data.length + 1, 16)}
            width={width}
        />
    )

    useEffect(() => {
        if (!variablesTypes.statuses.isSuccess) {
            dispatch(getVariablesTypes())
        }
        dispatch(getCallersBaseTableDataPage(callersBaseId, RequestPageTypes.First))
    }, [onlyInvalid, callersBaseId])

    return (
        <>
            {variablesTypes.statuses.isSuccess && (
                <div className={styles.table}>
                    <AutoSizer disableHeight>{renderMultiGrid}</AutoSizer>
                </div>
            )}

            {variablesTypes.statuses.isSuccess && (
                <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handlerHideMenuType}>
                    <div className={styles.menuWrapper}>
                        {variablesTypes.data.map((el) => (
                            <MenuItem key={el.name} onClick={handlerChangeVariableType(el)}>
                                {el.description}
                            </MenuItem>
                        ))}
                    </div>
                </Menu>
            )}
        </>
    )
}

export default CallersBaseViewTable
