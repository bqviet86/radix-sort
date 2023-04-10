import { createSlice } from '@reduxjs/toolkit'

import { getDigit } from '~/utils'

const processSlice = createSlice({
    name: 'process',
    initialState: {},
    reducers: {
        create(state, action) {
            const process = []
            const maxDigits = Math.max(...action.payload).toString().length
            let list = action.payload.map((value, index) => ({ index, value }))

            process.push({
                list: list.map((item) => ({
                    area: 'list',
                    position: item.index,
                    digit: 4,
                })),
                code: {
                    description: ['Starting...'],
                    highlight: '3-5, 8',
                },
            })

            for (let i = 0; i < maxDigits; i++) {
                const buckets = Array.from({ length: 10 }, () => [])
                const processDesc = `Processing the ${
                    (i === 0 && 'Ones') || (i === 1 && 'Tens') || (i === 2 && 'Hundreds') || (i === 3 && 'Thousands')
                }`
                let count = 0

                process.push({
                    list: process.at(-1).list.map((item) => ({
                        ...item,
                        digit: i,
                    })),
                    code: {
                        description: [processDesc],
                        highlight: '11-12',
                    },
                })

                for (let j = 0; j < list.length; j++) {
                    const digit = getDigit(list[j].value, i)

                    process.push({
                        // eslint-disable-next-line no-loop-func
                        list: process.at(-1).list.map((item, index) => {
                            if (index === list[j].index) {
                                return {
                                    area: 'bucket',
                                    position: digit,
                                    level: buckets[digit].length,
                                    digit: i,
                                }
                            }

                            return item
                        }),
                        code: {
                            description: [`${processDesc}:`, `Moving ${list[j].value} to bucket no ${digit}`],
                            highlight: '14-17',
                        },
                    })

                    buckets[digit].push(list[j])
                }

                for (let digit = 0; digit < buckets.length; digit++) {
                    if (buckets[digit].length > 0) {
                        for (let j = 0; j < buckets[digit].length; j++) {
                            const items = buckets[digit]
                                .map((item, index) => (index > j ? item.index : -1))
                                .filter((item) => item !== -1)

                            process.push({
                                // eslint-disable-next-line no-loop-func
                                list: process.at(-1).list.map((item, index) => {
                                    if (index === buckets[digit][j].index) {
                                        return {
                                            area: 'list',
                                            position: count,
                                            digit: i,
                                        }
                                    }

                                    if (items.includes(index)) {
                                        return {
                                            ...item,
                                            level: item.level - 1,
                                        }
                                    }

                                    return item
                                }),
                                code: {
                                    description: [
                                        `${processDesc}:`,
                                        `Restoring ${buckets[digit][j].value} to position ${count} in the list`,
                                    ],
                                    highlight: '19',
                                },
                            })

                            count++
                        }
                    }
                }

                list = [].concat(...buckets)
            }

            process.push({
                list: process.at(-1).list.map((item) => ({
                    ...item,
                    digit: 4,
                })),
                code: {
                    description: ['We are done!'],
                    highlight: '',
                },
            })

            return process
        },
    },
})

export default processSlice
