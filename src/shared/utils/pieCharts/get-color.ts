import {PieChartTypes} from 'core/api'

export const getColor = (key: PieChartTypes): string => {
    switch (key) {
        case 'CORRECT':
            return '#b5d300'
        case 'HAVEN_NOT_REACHED':
            return '#7a7b7c'
        case 'SCENARIO_NOT_END':
            return '#ff3504'
        case 'IN_PROGRESS':
            return '#bdbdbd'
        default:
            return ''
    }
}
