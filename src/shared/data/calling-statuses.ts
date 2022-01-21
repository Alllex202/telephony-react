import {CallingStatusModel, CallingStatusTypes} from 'core/api'

export const callingStatuses: Record<CallingStatusTypes, CallingStatusModel> = {
    RUN: {
        name: 'RUN',
        message: 'Текущие'
    },
    SCHEDULED: {
        name: 'SCHEDULED',
        message: 'Запланированные'
    },
    DONE: {
        name: 'DONE',
        message: 'Завершенные'
    }
}
