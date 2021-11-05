import {DatabaseModel} from "../../models";

export const fakeDatabases: DatabaseModel[] = [
    {
        id: 1,
        name: 'База данных 1',
        variablesList: ['variable_1', 'variable_2', 'variable_3'],
        created: new Date('11 10 2021').getTime(),
    },
    {
        id: 2,
        name: 'База данных 2',
        variablesList: ['variable_1', 'variable_2'],
        created: new Date('14 10 2021').getTime(),
    },
    {
        id: 3,
        name: 'База данных 3',
        variablesList: ['variable_1', 'variable_2', 'variable_3', 'variable_4'],
        created: new Date('09 10 2021').getTime(),
    },
    {
        id: 4,
        name: 'База данных 4',
        variablesList: ['variable_1'],
        created: new Date('01 10 2021').getTime(),
    },
    {
        id: 5,
        name: 'База данных 5',
        variablesList: [],
        created: new Date('21 10 2021').getTime(),
    },
];
