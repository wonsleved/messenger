import { createSlice, CaseReducer } from "@reduxjs/toolkit";

type SliceState = {
    isActive: boolean
}

const initialState: SliceState = {
    isActive: false
}

const toggleA: CaseReducer<SliceState>
    = (state) => {
    state.isActive = !state.isActive;
}

const menuSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        toggle: toggleA
    },
})

export const { toggle } = menuSlice.actions;
export default menuSlice.reducer;

