import { createSlice } from '@reduxjs/toolkit'

const sortSlice = createSlice({
    name: 'sort',
    initialState: false,
    reducers: {
        play() {
            return true
        },
        pause() {
            return false
        },
    },
})

export default sortSlice
