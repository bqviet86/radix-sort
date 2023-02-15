import { createSlice } from '@reduxjs/toolkit'

const firstRunSlice = createSlice({
    name: 'firstRun',
    initialState: true,
    reducers: {
        update(state, action) {
            return action.payload
        },
    },
})

export default firstRunSlice
