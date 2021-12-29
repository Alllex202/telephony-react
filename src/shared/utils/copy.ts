export const copy = (original: any): any => {
    return JSON.parse(JSON.stringify(original))
}
