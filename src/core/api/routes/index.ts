import {serverApi} from 'config';

const callersBase = 'callers-base';
const scenario = 'scenario';

export const apiRoutes = {
    callersBase: {
        byId: (id: string | number) => `${serverApi}/${callersBase}/${id}`,
        dataById: (id: string | number) =>`${serverApi}/${callersBase}/data/${id}`,
        header: () =>`${serverApi}/${callersBase}/header`,
        headerById: (id: string | number) =>`${serverApi}/${callersBase}/header/${id}`,
        uploadExcel: () =>`${serverApi}/${callersBase}/upload/exel`,
        variablesTypes: () =>`${serverApi}/${callersBase}/variables/types`,
    },
    scenario: {
        scenario: () => `${serverApi}/${scenario}`,
        byId: (id: string | number) => `${serverApi}/${scenario}/${id}`,
    },
};
