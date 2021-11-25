import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import NameInput from "../../components/input-name";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    changeCallersBaseHeaderById,
    getCallersBaseById,
    resetAll
} from "../../../../store/features/callers-bases/view";
import {RootState} from "../../../../store";
import CallersBaseViewTable from "./components/table";
import {putCallersBaseHeaderById} from "../../../../core/api/requests";
import {CallersBaseHeaderModel} from "../../../../core/api";

function CallersBaseViewBody() {
    const {
        size,
        variablesTypes,
        statusesHeader,
        statusesVariables,
        header,
        statusesData,
        data,
        page,
        isLastPage
    } = useSelector((state: RootState) => state.callersBaseView);
    const [name, setName] = useState<string>(header?.name || '');
    const [lastName, setLastName] = useState<string>(header?.name || '');
    const {callersBaseId} = useParams<{ callersBaseId: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCallersBaseById(callersBaseId));
        return () => {
            dispatch(resetAll());
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setName(header?.name || '');
        setLastName(header?.name || '');
    }, [header?.name])

    function handlerChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        if (statusesHeader.isLoading || statusesData.isLoading) return;

        setName(e.target.value);
    }

    function handlerSaveNameOnEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && header) {
            saveName({...header, name: name});
        }
    }

    function handlerSaveNameOnBlur(e: React.FocusEvent<HTMLInputElement>) {
        if (header) {
            saveName({...header, name: name});
        }
    }

    function saveName(data: CallersBaseHeaderModel) {
        if (statusesHeader.isLoading || statusesData.isLoading) return;
        if (name === '') return;
        if (lastName === name) return;

        dispatch(changeCallersBaseHeaderById(data));
    }

    if (header === null && statusesHeader.isError) {
        return <h1>{statusesHeader.error}</h1>
    }

    if (header === null && statusesHeader.isLoading) {
        return <h1>Загрузка...</h1>
    }

    return (
        <>
            {header &&
            <>
                <NameInput name={name} onChange={handlerChangeName} onKeyPress={handlerSaveNameOnEnter}
                           onBlur={handlerSaveNameOnBlur}/>
                <div className={styles.table}>
                    <CallersBaseViewTable/>
                </div>
            </>}
        </>
    );
}

export default CallersBaseViewBody;
