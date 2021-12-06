import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store";
import {
    changeCallersBaseHeaderById,
    getCallersBaseDataByPage,
    loadVariablesTypes,
    updateCallersBaseDataByPage
} from "store/features/callers-bases/view";
import {Table, TableBody, TableCell, TableHead, TableRow as MuiTableRow} from "@mui/material";
import BtnCircle from "components/ui-kit/btn-circle";
import Menu from "components/ui-kit/menu";
import MenuItem from "components/ui-kit/menu-item";
import {
    CallersBaseDataModel,
    CallersBaseHeaderColumnModel,
    VariableTypeModel
} from "core/api";
import InputVariableName from "./components/input-variable-name";

const CallersBaseViewTable = React.memo(() => {
    const dispatch = useDispatch();
    const {
        header,
        statusesData,
        statusesVariables,
        page,
        size,
        isLastPage,
        data,
        variablesTypes,
        statusesHeader,
        onlyInvalid
    } = useSelector((state: RootState) => state.callersBaseView);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [selectedVariable, selectVariable] = useState<CallersBaseHeaderColumnModel | null>(null);

    useEffect(() => {
        if (!variablesTypes) {
            dispatch(loadVariablesTypes());
        }
        if (header) {
            dispatch(updateCallersBaseDataByPage(header.id, {size, page: 0, onlyInvalid}))
        }
        // eslint-disable-next-line
    }, [header, onlyInvalid]);

    function handlerScroll(e: React.UIEvent<HTMLDivElement>) {
        if (statusesData.isLoading || statusesHeader.isLoading) return;
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight + 500 < e.currentTarget.scrollHeight) return;
        if (isLastPage) return;
        if (!header) return;

        dispatch(getCallersBaseDataByPage(header.id, {page: page + 1, size, onlyInvalid}))
    }

    function handlerShowMenuType(anchor: Element, variable: CallersBaseHeaderColumnModel) {
        if (statusesData.isLoading || statusesHeader.isLoading) return;
        setAnchorEl(anchor);
        selectVariable(variable);
    }

    function handlerHideMenuType() {
        setAnchorEl(null);
        selectVariable(null);
    }

    function handlerChangeVariableType(newType: VariableTypeModel) {
        if (statusesData.isLoading || statusesHeader.isLoading) return;
        if (!header) return;
        if (newType.name === selectedVariable?.type) {
            handlerHideMenuType();
            return;
        }

        dispatch(changeCallersBaseHeaderById({
            ...header,
            columns: header.columns.map(el => el.id === selectedVariable?.id ? {...el, type: newType.name} : el)
        }))
        handlerHideMenuType();
    }

    function conditionSaveVariablesName() {
        return !(statusesHeader.isLoading || statusesData.isLoading);
    }

    if (statusesData.isError || statusesVariables.isError) {
        return <h1>{statusesData.error || statusesVariables.error}</h1>;
    }

    return (
        <>
            <div className={styles.wrapper} onScroll={handlerScroll}>
                <Table stickyHeader className={'data-view'}>
                    <TableHead>
                        <MuiTableRow>
                            <TableCell></TableCell>
                            {header?.columns.map((el, ind) =>
                                <TableCell key={el.id}>
                                    <div className={styles.variable}>
                                        <div className={styles.type}>
                                            <span className={styles.text}>
                                                {variablesTypes && variablesTypes?.find(e => e.name === el.type)?.description}
                                            </span>
                                            <BtnCircle iconName={'arrow_drop_down'} className={styles.btn}
                                                       iconType={'round'}
                                                       onClick={e => handlerShowMenuType(e.currentTarget, el)}
                                                       isActive={!!anchorEl && selectedVariable?.id === el.id}
                                                       activeStyle={styles.active}/>
                                        </div>
                                        <div className={styles.name}>
                                            {/*{el.currentName}*/}
                                            <InputVariableName initState={el.currentName} el={el}
                                                               conditionSave={conditionSaveVariablesName}
                                                               data={header}/>
                                        </div>
                                    </div>
                                </TableCell>)}
                        </MuiTableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((el, ind) =>
                            <TableRow key={el.id} el={el} ind={ind}/>)}
                    </TableBody>
                </Table>
            </div>
            {variablesTypes && <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handlerHideMenuType}>
                <div className={styles.menuWrapper}>
                    {variablesTypes?.map(el =>
                        <MenuItem key={el.name} onClick={() => handlerChangeVariableType(el)}>
                            {el.description}
                        </MenuItem>)}
                </div>
            </Menu>}
        </>
    );
});

type PropsRow = {
    ind: number,
    el: CallersBaseDataModel,
}

const TableRow = React.memo(({el, ind}: PropsRow) => {
    return (
        <MuiTableRow key={el.id}>
            <TableCell>{ind + 1}</TableCell>
            {el.variables.map(el =>
                // <TableCellRender key={el.id} el={el}/>
                <TableCell key={el.id} className={!el.valid ? styles.invalidCell : ''}>
                    {el.value}
                </TableCell>
            )}
        </MuiTableRow>
    );
});

export default CallersBaseViewTable;
