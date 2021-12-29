const month: { [key: number]: string } = {
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

export function formatDate(ms: number, shortMonth?: boolean): string {
    const date = new Date(ms)
    let _month = month[date.getMonth()]
    if (shortMonth) {
        _month = _month.substr(0, 3)
            .toLowerCase()
    }

    return `${date.getDate()} ${_month} ${date.getFullYear()}`
}


