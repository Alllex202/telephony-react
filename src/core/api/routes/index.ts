import {serverApi} from 'config'
import {IdKey} from 'shared/types/id-key'

const callersBase = 'callers-base'
const scenario = 'scenario'
const calling = 'dialing'
const stats = 'statistic'
const _export = 'export'

export const apiRoutes = {
    callersBase: {
        byId: (id: IdKey) => `${serverApi}/${callersBase}/${id}`,
        data: {
            byId: (id: IdKey) => `${serverApi}/${callersBase}/data/${id}`
        },
        header: {
            list: () => `${serverApi}/${callersBase}/header`,
            byId: (id: IdKey) => `${serverApi}/${callersBase}/header/${id}`
        },
        uploadExcel: () => `${serverApi}/${callersBase}/upload/exel`,
        variablesTypes: () => `${serverApi}/${callersBase}/variables/types`
    },
    scenario: {
        scenario: () => `${serverApi}/${scenario}`,
        byId: (id: IdKey) => `${serverApi}/${scenario}/${id}`
    },
    calling: {
        calling: () => `${serverApi}/${calling}`,
        byId: (id: IdKey) => `${serverApi}/${calling}/${id}`,
        byCallersBaseId: (id: IdKey) => `${serverApi}/${calling}/${callersBase}/${id}`,
        scheduledByIdStart: (id: IdKey) => `${serverApi}/${calling}/scheduled/${id}/start`,
        result: {
            common: (id: IdKey) => `${serverApi}/${calling}/${id}/result/common`,
            pieChart: (id: IdKey) => `${serverApi}/${calling}/${id}/result/pie-chart`,
            chart: (id: IdKey) => `${serverApi}/${calling}/${id}/result/success-calls-chart`,
            table: {
                data: (id: IdKey) => `${serverApi}/${calling}/${id}/result/table/data`,
                header: (id: IdKey) => `${serverApi}/${calling}/${id}/result/table/header`
            }
        }
    },
    stats: {
        common: () => `${serverApi}/${stats}/common`,
        pieChart: () => `${serverApi}/${stats}/pie-chart`,
        chart: () => `${serverApi}/${stats}/success-calls-chart`
    },
    export: {
        calling: (id: IdKey) => `${serverApi}/${_export}/results/${id}`
    }
}
