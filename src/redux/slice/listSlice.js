import { createSlice } from '@reduxjs/toolkit'

const listSlice = createSlice({
    name: 'list',
    initialState: [],
    reducers: {
        create(state, action) {
            return action.payload
        },
    },
})

export default listSlice
