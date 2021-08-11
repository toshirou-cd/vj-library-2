import { Reducer } from "react";
import { LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT, UserAction, UserState } from "../types";

const user = JSON.parse(localStorage.getItem("user")|| "{}")

const initialState  = {
    user : null,
    isLoggedIn : false,
    role : null
}

export const AuthReducer = (state :UserState= initialState,action:UserAction):UserState => {
    // const {type,payload} =action

    switch(action.type) {
        case LOGIN_SUCCESS : {
            if(action.payload)
            return {
                ...state,
                user : action.payload.user,
                isLoggedIn : true,
                role : action.payload.role
            }
        }
            break
        case LOGIN_FAIL :
            return {
                ...state,
                user :null,
                isLoggedIn : false,
                role : null
            }
        case LOGOUT :
            return {
                ...state,
                isLoggedIn : false,
                user:null
            }
        default :
            return state
    }
    return state
}   