import {combineReducers} from "redux";
import {databaseReducer} from "./database.reducer";

export const rootReducer = combineReducers({
    database: databaseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
