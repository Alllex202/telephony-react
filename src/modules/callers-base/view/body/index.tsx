import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import InputName from "../../components/input-name";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    changeCallersBaseHeaderById,
    getCallersBaseById,
    resetAll
} from "../../../../store/features/callers-bases/view";
import {RootState} from "../../../../store";
import CallersBaseViewTable from "./components/table";

function CallersBaseViewBody() {
    const {
        statusesHeader,
        header,
        statusesData,
    } = useSelector((state: RootState) => state.callersBaseView);
    const [name, setName] = useState<string>(header?.name || '');
    const [lastName, setLastName] = useState<string>(name);
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

    function onSave(currentValue: string) {
        if (header) {
            saveName(currentValue);
        }
    }

    function saveName(newName: string) {
        if (statusesHeader.isLoading || statusesData.isLoading || name === '') {
            setName(lastName);
            return;
        }
        if (lastName === newName || !header) return;

        dispatch(changeCallersBaseHeaderById({...header, name: newName}));
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
                <div className={styles.name}>
                    <InputName text={name} lastText={lastName} setText={setName} setLastText={setLastName}
                               callback={onSave}/>
                </div>

                <div className={styles.table}>
                    <CallersBaseViewTable/>
                </div>
            </>}
        </>
    );
}

export default CallersBaseViewBody;
