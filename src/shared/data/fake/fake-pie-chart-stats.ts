import {StatsPieChartModel} from 'core/api'

export const fakePieChartStats: StatsPieChartModel = {
    percentSuccess: 70,
    parts: [
        {
            name: 'Успешно завершенные',
            value: 100,
            key: 'CORRECT'
        },
        {
            name: 'Сценарий не завершен',
            value: 8,
            key: 'SCENARIO_NOT_END'
        },
        {
            name: 'Не дозвонились',
            value: 8,
            key: 'HAVEN_NOT_REACHED'
        },
        {
            name: 'В процессе',
            value: 14,
            key: 'IN_PROGRESS'
        }
    ]
}
