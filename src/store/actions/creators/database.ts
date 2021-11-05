import {DatabaseAction, DatabaseActionTypes} from "../../../shared/types/database";
import {Dispatch} from "redux";
import {getDatabases} from "../../../core/api/requests";

export const fetchDatabases = () => {
    return async (dispatch: Dispatch<DatabaseAction>) => {
        try {
            dispatch({type: DatabaseActionTypes.FETCH_DATABASES});
            const response = await getDatabases();
            dispatch({type: DatabaseActionTypes.FETCH_DATABASES_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: DatabaseActionTypes.FETCH_DATABASES_ERROR,
                payload: 'Произошла ошибка при загрузке баз данных'
            });
        }
    }
}
