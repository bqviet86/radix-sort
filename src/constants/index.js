export const RADIX_SORT_CODE = `
// The function returns the i digit of the number n
function getDigit(n, i) {
    return Math.floor(n / Math.pow(10, i)) % 10
}

function radixSort(arr) {
    // Find the largest number of digits in the array
    const maxDigits = Math.max(...arr).toString().length

    // Use the counting sort algorithm to sort the digits
    for (let i = 0; i < maxDigits; i++) {
        const buckets = Array.from({ length: 10 }, () => [])

        for (let j = 0; j < arr.length; j++) {
            const digit = getDigit(arr[j], i)

            buckets[digit].push(arr[j])
        }

        arr = [].concat(...buckets)
    }

    return arr
}
`

export const RADIX_SORT_CODE_DESCRIPTION = `
create 10 buckets (array) for each digit (0 to 9)
for each digit placing
    for each element in list
        move element into respective bucket
    for each bucket, starting from smallest digit
        while bucket is non-empty
            restore element to list
`
export const speedList = [0.5, 0.75, 1, 1.25, 1.5]
