import {configureStore} from '@reduxjs/toolkit'
import rootReducer from "./reducers";
import {errorMiddleware} from "./middlewares/error.middleware";

export const store = configureStore({
    reducer: {
        rootReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(errorMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch, getState } = store;
