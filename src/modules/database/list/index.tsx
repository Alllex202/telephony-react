import React, {useEffect} from 'react';
import {useTypesSelector} from "../../../shared/hoocks";
import {useDispatch} from "react-redux";
import {fetchDatabases} from "../../../store/actions/creators/database";
import {Link} from 'react-router-dom';
import routes from "../../../routing/routes";
import styles from './styles.module.scss';

const DatabaseList: React.FC = () => {
    const {databases, loading, error} = useTypesSelector(state => state.database);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDatabases());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) {
        return <h1>Идет загрузка ...</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <>
            <div className={styles.list}>
                {databases.map((db) => <Link key={db.id} to={routes.databaseView(db.id)} style={{marginBottom: 10}}>{db.name}</Link>)}
            </div>
        </>
    );
};

export default DatabaseList;
