import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../store";
import {
    changeCallersBaseHeaderById,
    getCallersBaseDataByPage,
    loadVariablesTypes,
    resetData
} from "../../../../../../store/features/callers-bases/view";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import BtnCircle from "../../../../../../components/ui-kit/btn-circle";
import Menu from "../../../../../../components/ui-kit/menu";
import MenuItem from "../../../../../../components/ui-kit/menu-item";
import {
    CallersBaseDataColumnModel,
    CallersBaseDataModel,
    CallersBaseHeaderColumnModel,
    CallersBaseHeaderModel,
    VariableTypeModel
} from "../../../../../../core/api";

function CallersBaseViewTable() {
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
        statusesHeader
    } = useSelector((state: RootState) => state.callersBaseView);
    const [selectedInvalid, selectInvalid] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [selectedVariable, selectVariable] = useState<CallersBaseHeaderColumnModel | null>(null);

    useEffect(() => {
        if (!variablesTypes) {
            dispatch(loadVariablesTypes());
        }
        if (header) {
            dispatch(resetData());
            dispatch(getCallersBaseDataByPage(header.id, {size, page: 0}));
        }
        // eslint-disable-next-line
    }, [header]);

    function handlerScroll(e: React.UIEvent<HTMLDivElement>) {
        if (statusesData.isLoading || statusesHeader.isLoading) return;
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight + 500 < e.currentTarget.scrollHeight) return;
        if (isLastPage) return;
        if (!header) return;

        dispatch(getCallersBaseDataByPage(header?.id, {page: page + 1, size}))
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

    if (statusesData.isError || statusesVariables.isError) {
        return <h1>{statusesData.error || statusesVariables.error}</h1>;
    }

    // if (statusesData.isLoading || statusesVariables.isLoading) {
    //     return <h1>Загрузка...</h1>;
    // }

    return (
        <>
            <div className={styles.wrapper} onScroll={handlerScroll}>
                <Table stickyHeader className={'data-view'}>
                    <TableHeadRender header={header} variablesTypes={variablesTypes}
                                     handlerShowMenuType={handlerShowMenuType} anchorEl={anchorEl}
                                     selectedVariable={selectedVariable}/>
                    <TableBodyRender data={data} selectedInvalid={selectedInvalid}/>
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
}

type PropsBody = {
    data: CallersBaseDataModel[] | null,
    selectedInvalid: number | null,
}

const TableBodyRender = React.memo(({data, selectedInvalid}: PropsBody) => {
    return (
        <TableBody>
            {data?.map((el, ind) =>
                    <TableRowRender key={el.id} el={el} selectedInvalid={selectedInvalid} ind={ind}/>
                // <TableRow key={el.id} className={selectedInvalid === el.id ? styles.invalidRow : ''}>
                //     <TableCell>{ind + 1}</TableCell>
                //     {el.variables.map(el =>
                //         <TableCell key={el.id} className={!el.valid ? styles.invalidCell : ''}>
                //             {el.value}
                //         </TableCell>)}
                // </TableRow>
            )}
        </TableBody>
    );
});

type PropsRow = {
    selectedInvalid: number | null,
    ind: number,
    el: CallersBaseDataModel,
}

const TableRowRender = React.memo(({selectedInvalid, el, ind}: PropsRow) => {
    return (
        <TableRow key={el.id} className={selectedInvalid === el.id ? styles.invalidRow : ''}>
            <TableCell>{ind + 1}</TableCell>
            {el.variables.map(el =>
                // <TableCellRender key={el.id} el={el}/>
                <TableCell key={el.id} className={!el.valid ? styles.invalidCell : ''}>
                    {el.value}
                </TableCell>
            )}
        </TableRow>
    );
});

// type PropsCell = {
//     el: CallersBaseDataColumnModel,
// }
//
// const TableCellRender = React.memo(({el}: PropsCell) => {
//     return (
//         <TableCell key={el.id} className={!el.valid ? styles.invalidCell : ''}>
//             {el.value}
//         </TableCell>
//     );
// });

type PropsHead = {
    header: CallersBaseHeaderModel | null,
    variablesTypes: VariableTypeModel[] | null,
    handlerShowMenuType: Function,
    anchorEl: Element | null,
    selectedVariable: CallersBaseHeaderColumnModel | null,
}

const TableHeadRender =
    React.memo(({header, handlerShowMenuType, variablesTypes, selectedVariable, anchorEl}: PropsHead) => {
        return (
            <TableHead>
                <TableRow>
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
                                    {el.currentName}
                                </div>
                            </div>
                        </TableCell>)}
                </TableRow>
            </TableHead>
        );
    })

export default CallersBaseViewTable;
