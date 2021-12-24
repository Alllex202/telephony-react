export interface CallingModel {
    callersBaseId: number | string,
    created?: number,
    id?: number | string,
    name: string,
    scenarioId: number | string,
    startDate: number,
    status?: CallingStatuses,
}

export type CallingStatuses = 'RUN' | 'SCHEDULED' | 'DONE';

export interface CallingStatusModel {
    name: CallingStatuses,
    message: string,
}

export const callingStatuses: Record<CallingStatuses, CallingStatusModel> = {
    RUN: {
        name: 'RUN',
        message: 'Запущен',
    },
    SCHEDULED: {
        name: 'SCHEDULED',
        message: 'Отложен',
    },
    DONE: {
        name: 'DONE',
        message: 'Готов',
    },
};
