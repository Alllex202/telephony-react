import {CallingResultPieChartModel} from 'core/api'

export const fakePieChart: CallingResultPieChartModel = {
    countSuccess: 70,
    countCallers: 100,
    percentSuccess: 70,
    parts: [
        {
            name: 'Успешно завершенные',
            value: 70,
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
