import { createSlice } from '@reduxjs/toolkit'

const currentStepSlice = createSlice({
    name: 'currentStep',
    initialState: -1,
    reducers: {
        update(state, action) {
            return action.payload
        },
    },
})

export default currentStepSlice
