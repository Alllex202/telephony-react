import {DatabaseAction, DatabaseActionTypes, DatabaseState} from "../../shared/types/database";

const initialState: DatabaseState = {
    databases: [],
    loading: false,
    error: null,
};

export const databaseReducer = (state = initialState, action: DatabaseAction): DatabaseState => {
    switch (action.type) {
        case DatabaseActionTypes.FETCH_DATABASES:
            return {loading: true, error: null, databases: []};
        case DatabaseActionTypes.FETCH_DATABASES_SUCCESS:
            return {loading: false, error: null, databases: action.payload};
        case DatabaseActionTypes.FETCH_DATABASES_ERROR:
            return {loading: false, error: action.payload, databases: []};
        default:
            return state;
    }
};
