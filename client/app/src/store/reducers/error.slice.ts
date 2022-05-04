import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

type SliceState = { errors: string[] }

const initialState: SliceState = {
    errors: []
}

const errorOccurA: CaseReducer<SliceState, PayloadAction<string>>
    = (state, action) => {
    state.errors = [...state.errors, action.payload];
}

const removeErrorA: CaseReducer<SliceState, PayloadAction<string>>
    = (state, action) => {
    state.errors = state.errors.filter(error => error !== action.payload);
}

const clearErrorsA: CaseReducer<SliceState>
    = (state) => {
    state.errors = [];
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        errorOccur: errorOccurA,
        removeError: removeErrorA,
        clearErrors: clearErrorsA
    },
})

export const { errorOccur, removeError, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;



