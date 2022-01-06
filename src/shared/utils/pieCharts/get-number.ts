import {PieChartTypes} from 'core/api'

export const getNumber = (key: PieChartTypes): number => {
    switch (key) {
        case 'CORRECT':
            return 0
        case 'HAVEN_NOT_REACHED':
            return 2
        case 'SCENARIO_NOT_END':
            return 1
        case 'IN_PROGRESS':
            return 3
        default:
            return 10
    }
}
