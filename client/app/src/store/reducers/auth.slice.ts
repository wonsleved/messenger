import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../models/IUser";

type SliceState = { user: IUser | null }


const initialState: SliceState = {
    user: null
}

const userLoadedA: CaseReducer<SliceState, PayloadAction<IUser | null>>
    = (state, action) => {
            state.user = action.payload
        }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoaded: userLoadedA,
    },
})

export const { userLoaded } = authSlice.actions;
export default authSlice.reducer;



