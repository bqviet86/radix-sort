const randomList = (number, maxValue) => {
    const result = Array.from({ length: number }, () => Math.floor(Math.random() * maxValue) + 1)

    return result
}

export default randomList
