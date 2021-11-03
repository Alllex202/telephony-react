import React from 'react';
import {useParams} from "react-router-dom";

const DatabaseView = () => {
    const {databaseId}: any = useParams();

    return (
        <div>
            Просмотр базы данных {databaseId}
        </div>
    );
};

export default DatabaseView;
