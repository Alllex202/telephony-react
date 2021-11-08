import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {deleteDatabaseById, getDatabaseById} from "../../../core/api/requests";
import routes from "../../../routing/routes";
import {DatabaseModel} from "../../../core/api/models";
import {DefaultAxiosError} from "../../../shared/types/base-response-error";
import {useCancelFetchAxios} from "../../../shared/hoocks";

const DatabaseView = () => {
    const [isDeleting, setDeleting] = useState<boolean>(false);
    const [errDeleting, setErrDeleting] = useState<string>('');
    const {databaseId} = useParams<{ databaseId: string }>();
    const history = useHistory();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [database, setDatabase] = useState<DatabaseModel | null>(null);

    const {token, cancel} = React.useMemo(useCancelFetchAxios, [databaseId]);

    useEffect(() => {
        setLoading(true);
        getDatabaseById(databaseId, token)
            .then(res => {
                setDatabase(res.data);
                setIsError(false);
                setSuccess(true);
            })
            .catch((err: DefaultAxiosError) => {
                setError(err.response?.data.message || 'Необработанная ошибка');
                setIsError(true);
                setSuccess(false);
            })
            .finally(() => {
                setLoading(false);
            });
        return () => cancel();
    }, [databaseId, cancel, token]);

    const onDelete = () => {
        setDeleting(true);
        deleteDatabaseById(databaseId)
            .then(res => {
                history.push(routes.databaseList());
            })
            .catch((err: DefaultAxiosError) => {
                setErrDeleting(err.response?.data.message || 'Необработанная ошибка');
            })
            .finally(() => {
                setDeleting(false);
            });
    };

    if (isLoading) {
        return <h1>Загрузка ...</h1>
    }
    if (isError) {
        return <h1>Ошибка при загрузке данных ({error})</h1>
    }

    return (
        <>
            {isSuccess && !database
                ? <h1>Данные отсутствуют</h1>
                : <div>
                    <button disabled={isDeleting} onClick={onDelete}>delete</button> <span>{errDeleting}</span>
                    <div>id: {database?.id}</div>
                    <div>name: {database?.name}</div>
                    <div>callers:
                        <ul style={{marginLeft: 40}}>
                            {database?.callers?.map((call, ind) =>
                                <li key={call.id}>({call.id}) {call.number} ({String(call.valid)})</li>)}
                        </ul>
                    </div>
                    <div>variablesList:
                        <ul style={{marginLeft: 40}}>
                            {database?.variablesList.map((variable, ind) =>
                                <li key={ind}>{variable}</li>)}
                        </ul>
                    </div>
                    <div>created: {new Date(Number(database?.created)).toString()}</div>
                </div>}
        </>
    )
};

export default DatabaseView;
