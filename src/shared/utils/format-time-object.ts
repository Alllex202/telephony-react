import {TimeModel} from 'core/api'

export const formatTimeObject = (timeObj?: TimeModel) => {
    if (!timeObj) return ''

    const res: string[] = []

    if (timeObj.hours > 0) {
        res.push(`${timeObj.hours} ч.`)
    }
    if (timeObj.minutes > 0) {
        res.push(`${timeObj.minutes} мин.`)
    }
    if (timeObj.seconds > 0) {
        res.push(`${timeObj.seconds} сек.`)
    }

    return res.join(' ')
}
