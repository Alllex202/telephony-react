import React, {useEffect, useState} from 'react'
import styles from 'shared/styles/table/styles.module.scss'
import 'shared/styles/table/styles.scss'
import {useDispatch} from 'react-redux'
import {
    changeCallersBaseCommon,
    getCallersBaseTableDataPage,
    getVariablesTypes
} from 'store/callers-bases/view'
import {Table, TableBody, TableCell, TableHead, TableRow as MuiTableRow} from '@mui/material'
import BtnCircle from 'components/ui-kit/btn-circle'
import Menu from 'components/ui-kit/menu'
import MenuItem from 'components/ui-kit/menu-item'
import {CallersBaseHeaderColumnModel, VariableTypeModel} from 'core/api'
import InputVariableName from './components/input-variable-name'
import {useSelectorApp} from 'shared/hoocks'
import {useParams} from 'react-router-dom'
import {RequestPageTypes} from 'shared/types'
import TableRow from 'modules/callers-base/view/body/components/table/components/table-row'

const CallersBaseViewTable = React.memo(() => {
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

    const handlerScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (
            statuses.isLoading ||
            isLastPage ||
            e.currentTarget.scrollTop + e.currentTarget.clientHeight + 500 <
                e.currentTarget.scrollHeight
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

    useEffect(() => {
        if (!variablesTypes.statuses.isSuccess) {
            dispatch(getVariablesTypes())
        }
        dispatch(getCallersBaseTableDataPage(callersBaseId, RequestPageTypes.First))
    }, [onlyInvalid, callersBaseId])

    return (
        <>
            {variablesTypes.statuses.isSuccess && (
                <div className={styles.wrapper} onScroll={handlerScroll}>
                    <Table stickyHeader className={'data-view'}>
                        <TableHead>
                            <MuiTableRow>
                                <TableCell />
                                {common.data?.columns.map((el) => (
                                    <TableCell key={el.id}>
                                        <div className={styles.variable}>
                                            <div className={styles.type}>
                                                <span className={styles.text}>
                                                    {variablesTypes.data.find(
                                                        (e) => e.name === el.type
                                                    )?.description ?? ''}
                                                </span>
                                                <BtnCircle
                                                    iconName={'arrow_drop_down'}
                                                    className={styles.btn}
                                                    iconType={'round'}
                                                    onClick={handlerShowMenuType(el)}
                                                    isActive={
                                                        !!anchorEl && selectedVariable?.id === el.id
                                                    }
                                                    activeStyle={styles.active}
                                                />
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
                                    </TableCell>
                                ))}
                            </MuiTableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((el, ind) => (
                                <TableRow key={el.id} el={el} ind={ind} />
                            ))}
                        </TableBody>
                    </Table>
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
})

export default CallersBaseViewTable
