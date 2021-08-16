import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthReducer";
import { CartReducer } from "./CartReducer";
export default combineReducers({
    AuthReducer,
    CartReducer
})
