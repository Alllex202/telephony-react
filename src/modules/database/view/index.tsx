import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {deleteDatabaseById, getDatabaseById} from "../../../core/api/requests";
import routes from "../../../routing/routes";
import {DatabaseModel} from "../../../core/api/models";
import {DefaultAxiosError} from "../../../shared/types/base-response-error";
import {useCancelFetchAxios} from "../../../shared/hoocks";
import {FetchStatuses} from "../../../shared/types/fetch-statuses";

const DatabaseView = () => {
    const [isDeleting, setDeleting] = useState<boolean>(false);
    const [errDeleting, setErrDeleting] = useState<string>('');
    const {databaseId} = useParams<{ databaseId: string }>();
    const history = useHistory();
    const [fetchStatuses, setFetchStatuses] = useState<FetchStatuses>({
        isError: false,
        isLoading: false,
        isSuccess: false
    });
    const [error, setError] = useState<string>('');
    const [database, setDatabase] = useState<DatabaseModel | null>(null);

    const {token, cancel} = React.useMemo(useCancelFetchAxios, [databaseId]);

    useEffect(() => {
        setFetchStatuses({isError: false, isLoading: true, isSuccess: false});
        getDatabaseById(databaseId, {cancelToken: token})
            .then(res => {
                setDatabase(res.data);
                setFetchStatuses({isError: false, isLoading: false, isSuccess: true});
            })
            .catch((err: DefaultAxiosError) => {
                setError(err.response?.data.message || 'Необработанная ошибка');
                setFetchStatuses({isError: true, isLoading: false, isSuccess: false});
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

    if (fetchStatuses.isLoading) {
        return <h1>Загрузка ...</h1>
    }
    if (fetchStatuses.isError) {
        return <h1>Ошибка при загрузке данных ({error})</h1>
    }

    return (
        <>
            {fetchStatuses.isSuccess && !database
                ? <h1>Данные отсутствуют</h1>
                : <div>
                    <button disabled={isDeleting} onClick={onDelete}>delete</button>
                    <span>{errDeleting}</span>
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
