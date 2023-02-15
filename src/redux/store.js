import { configureStore } from '@reduxjs/toolkit'

import { listSlice, processSlice, sortSlice, currentStepSlice, speedSlice, firstRunSlice } from './slice'

const store = configureStore({
    reducer: {
        list: listSlice.reducer,
        process: processSlice.reducer,
        sort: sortSlice.reducer,
        currentStep: currentStepSlice.reducer,
        speed: speedSlice.reducer,
        firstRun: firstRunSlice.reducer,
    },
})

export default store
