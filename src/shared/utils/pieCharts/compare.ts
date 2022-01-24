import {ExtraPieChartPartModel} from 'store/calling/view'

export const compare = (a: ExtraPieChartPartModel, b: ExtraPieChartPartModel): number => {
    return a.number - b.number
}
