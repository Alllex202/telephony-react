import {pad} from 'shared/utils'

const month: {[key: number]: string} = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь'
}

export const formatDate = (ms: number, shortMonth?: boolean, isTime?: boolean): string => {
    const date = new Date(ms)
    let _month = month[date.getMonth()]
    let time: string = ''
    if (shortMonth) {
        _month = _month.substring(0, 3).toLowerCase()
    }
    if (isTime) {
        const _time = {
            hours: pad(date.getHours(), 2),
            minutes: pad(date.getMinutes(), 2)
        }

        time = `, ${_time.hours}:${_time.minutes}`
    }

    return `${date.getDate()} ${_month} ${date.getFullYear()}${time}`
}
