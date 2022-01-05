import {serverApi} from 'config'

const callersBase = 'callers-base'
const scenario = 'scenario'
const calling = 'dialing'

export const apiRoutes = {
    callersBase: {
        byId: (id: string | number) => `${serverApi}/${callersBase}/${id}`,
        dataById: (id: string | number) => `${serverApi}/${callersBase}/data/${id}`,
        header: () => `${serverApi}/${callersBase}/header`,
        headerById: (id: string | number) => `${serverApi}/${callersBase}/header/${id}`,
        uploadExcel: () => `${serverApi}/${callersBase}/upload/exel`,
        variablesTypes: () => `${serverApi}/${callersBase}/variables/types`
    },
    scenario: {
        scenario: () => `${serverApi}/${scenario}`,
        byId: (id: string | number) => `${serverApi}/${scenario}/${id}`
    },
    calling: {
        calling: () => `${serverApi}/${calling}`,
        byId: (id: string | number) => `${serverApi}/${calling}/${id}`,
        byCallersBaseId: (id: string | number) => `${serverApi}/${calling}/${callersBase}/${id}`,
        scheduledByIdStart: (id: string | number) => `${serverApi}/${calling}/scheduled/${id}/start`
    }
}
