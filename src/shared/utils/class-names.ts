export const classNames = (...names: Array<string | undefined | null>): string => {
    return names.filter((e) => e).join(' ')
}
