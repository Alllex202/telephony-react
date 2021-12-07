import {serverApi} from 'config';

const callersBase = 'callers-base';

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
    }
};
