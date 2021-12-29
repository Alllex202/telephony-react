export interface CallingModel {
    callersBase: {
        id: number | string,
        name?: string,
    },
    created?: number,
    id?: number | string,
    name: string,
    percentEnd?: number,
    scenario: {
        id: number | string,
        name?: string,
    },
    startDate?: number,
    status: CallingStatuses,
}

export type CallingStatuses = 'RUN' | 'SCHEDULED' | 'DONE';

export interface CallingStatusModel {
    name: CallingStatuses,
    message: string,
}

export const callingStatuses: Record<CallingStatuses, CallingStatusModel> = {
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
