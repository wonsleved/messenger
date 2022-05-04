import {combineReducers} from "@reduxjs/toolkit";
import AuthReducer from "./auth.slice";
import MessengerReducer from "./messenger.slice";
import ErrorReducer from "./error.slice";
import MenuReducer from "./menu.slice";

const rootReducer = combineReducers({
    auth: AuthReducer,
    messenger: MessengerReducer,
    error: ErrorReducer,
    menu: MenuReducer
});

export default rootReducer;
