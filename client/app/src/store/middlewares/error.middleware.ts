import {createListenerMiddleware, PayloadAction} from '@reduxjs/toolkit';
import {errorOccur, removeError} from "../reducers/error.slice";
import {dispatch} from "../index";

const errorMiddleware = createListenerMiddleware();

errorMiddleware.startListening({
    actionCreator: errorOccur,
    effect: async (action: PayloadAction<any>, listenerApi: any) => {
        listenerApi.cancelActiveListeners();

        setTimeout(() => {
            dispatch(removeError(action.payload));
        }, 3000);
    },
});

export { errorMiddleware };