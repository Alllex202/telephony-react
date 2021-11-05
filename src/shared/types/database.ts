import {DatabaseModel} from "../../core/api/models";

export interface DatabaseState {
    databases: DatabaseModel[];
    loading: boolean;
    error: null | string;
}

export enum DatabaseActionTypes {
    FETCH_DATABASES = 'FETCH_DATABASES',
    FETCH_DATABASES_SUCCESS = 'FETCH_DATABASES_SUCCESS',
    FETCH_DATABASES_ERROR = 'FETCH_DATABASES_ERROR',
}

interface FetchDatabaseAction {
    type: DatabaseActionTypes.FETCH_DATABASES;
}

interface FetchDatabaseSuccessAction {
    type: DatabaseActionTypes.FETCH_DATABASES_SUCCESS;
    payload: DatabaseModel[];
}

interface FetchDatabaseErrorAction {
    type: DatabaseActionTypes.FETCH_DATABASES_ERROR;
    payload: string;
}

export type DatabaseAction = FetchDatabaseAction | FetchDatabaseSuccessAction | FetchDatabaseErrorAction;
