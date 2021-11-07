import React, {useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {deleteDatabaseById, getDatabaseById} from "../../../core/api/requests";
import routes from "../../../routing/routes";

const DatabaseView = () => {
    const [isDeleting, setDeleting] = useState(false);
    const {databaseId} = useParams<{ databaseId: string }>();
    const history = useHistory();
    const {
        data: res,
        // error,
        isError,
        isLoading,
        isSuccess
    } = useQuery(['database', databaseId], () => getDatabaseById(databaseId), {});

    const onDelete = async () => {
        setDeleting(true);
        const res = await deleteDatabaseById(databaseId);
        if (res.status === 200) {
            history.push(routes.databaseList());
        } else {
            setDeleting(true);
            console.log('delete error');
        }
    };

    if (isLoading) {
        return <h1>Загрузка ...</h1>
    }
    if (isError) {
        return <h1>Ошибка при загрузке данных</h1>
    }

    return (
        <>
            {isSuccess &&
            <div>
                <button disabled={isDeleting} onClick={onDelete}>delete</button>
                <div>id: {res?.data.id}</div>
                <div>name: {res?.data.name}</div>
                <div>callers:
                    <ul style={{marginLeft: 40}}>
                        {res?.data.callers?.map((call, ind) =>
                            <li key={call.id}>({call.id}) {call.number} ({String(call.valid)})</li>)}
                    </ul>
                </div>
                <div>variablesList:
                    <ul style={{marginLeft: 40}}>
                        {res?.data.variablesList.map((variable, ind) =>
                            <li key={ind}>{variable}</li>)}
                    </ul>
                </div>
                <div>created: {new Date(Number(res?.data.created)).toString()}</div>
            </div>}
        </>
    )
};

export default DatabaseView;
