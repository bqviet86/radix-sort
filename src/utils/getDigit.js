const getDigit = (n, i) => {
    return Math.floor(n / Math.pow(10, i)) % 10
}

export default getDigit
