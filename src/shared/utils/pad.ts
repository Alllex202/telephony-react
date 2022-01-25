import {IdKey} from 'shared/types/id-key'

export const pad = (num: IdKey, size: number): string => {
    num = num.toString()
    while (num.length < size) {
        num = '0' + num
    }
    return num
}
