import {CallerModel} from "./caller.model";

export interface DatabaseModel {
    id: number | string,
    name: string,
    variablesList: string[],
    callers?: CallerModel[],
    created: number,
}
