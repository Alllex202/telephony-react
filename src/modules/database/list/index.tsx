import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import routes from "../../../routing/routes";
import styles from './styles.module.scss';
import {getDatabases} from "../../../core/api/requests";
import {DatabaseModel} from "../../../core/api/models";
import {DefaultAxiosError} from "../../../shared/types/base-response-error";
import AddDatabaseModal from "../add-modal";
import {useCancelFetchAxios} from "../../../shared/hoocks";


const DatabaseList = () => {
    const [isOpenedModal, openModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [databases, setDatabases] = useState<DatabaseModel[]>([]);

    const {token, cancel} = React.useMemo(useCancelFetchAxios, []);

    useEffect(() => {
        setLoading(true);
        getDatabases(token)
            .then((res) => {
                setDatabases(res.data);
                setSuccess(true);
                setIsError(false);
            })
            .catch((err: DefaultAxiosError) => {
                setError(err.response?.data.message || 'Необработанная ошибка');
                setIsError(true);
                setSuccess(false);
            })
            .finally(() => {
                setLoading(false);
            })
        return () => cancel();
    }, [cancel, token]);

    const insertDatabase = (newDatabase: DatabaseModel) => {
        setDatabases([newDatabase, ...databases]);
    };

    const onAddDatabase = () => {
        openModal(true);
    };

    if (isLoading) {
        return <h1>Идет загрузка ...</h1>
    }
    if (isError) {
        return <h1>Ошибка при загрузке данных ({error})</h1>
    }

    return (
        <>
            <button onClick={onAddDatabase}>ADD</button>
            {isSuccess && databases.length === 0
                ? <h1>Нет данных</h1>
                : <>
                    <div className={styles.list}>
                        {databases?.map(db =>
                            <Link key={db.id} to={routes.databaseView(db.id)}
                                  style={{marginBottom: 10}}>{db.name}</Link>)}
                    </div>
                </>}
            {isOpenedModal &&
            <AddDatabaseModal insertDatabase={insertDatabase} isOpenedModal={isOpenedModal} openModal={openModal}/>}
        </>
    );
};

export default DatabaseList;
