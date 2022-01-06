import {serverApi} from 'config'

const callersBase = 'callers-base'
const scenario = 'scenario'
const calling = 'dialing'
const stats = 'statistic'

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
        scheduledByIdStart: (id: string | number) => `${serverApi}/${calling}/scheduled/${id}/start`,
        result: {
            common: (id: number | string) => `${serverApi}/${calling}/${id}/result/common`,
            pieChart: (id: number | string) => `${serverApi}/${calling}/${id}/result/pie-chart`,
            chart: (id: number | string) => `${serverApi}/${calling}/${id}/result/success-calls-chart`,
            table: {
                data: (id: number | string) => `${serverApi}/${calling}/${id}/result/table/data`,
                header: (id: number | string) => `${serverApi}/${calling}/${id}/result/table/header`,
            }
        }
    },
    stats: {
        common: () => `${serverApi}/${stats}/common`,
        pieChart: () => `${serverApi}/${stats}/pie-chart`,
        chart: () => `${serverApi}/${stats}/success-calls-chart`
    }
}
