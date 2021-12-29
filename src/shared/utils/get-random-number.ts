export const getRandomNumber = (min: number = 1, max: number = 9999999): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}
