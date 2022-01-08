export const pad = (num: number | string, size: number): string => {
    num = num.toString()
    while (num.length < size) {
        num = '0' + num
    }
    return num
}
