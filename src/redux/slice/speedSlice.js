import { createSlice } from '@reduxjs/toolkit'

const speedSlice = createSlice({
    name: 'speed',
    initialState: 1,
    reducers: {
        update(state, action) {
            return action.payload
        },
    },
})

export default speedSlice
