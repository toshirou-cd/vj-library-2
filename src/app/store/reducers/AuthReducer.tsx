import { Reducer } from "react";
import { LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT, UserState, AuthDispatchType, IUser } from "../types";

const user = JSON.parse(localStorage.getItem("user")|| "{}")

const tmp : IUser ={
    avatar: "abc",
    birth: "abc",
    department :"abc"
}
const initialState:UserState = {
    user : tmp,
    isLoggedIn : user.data? true : false,
    role : null
}
 export const AuthReducer = (state :UserState = initialState,action:AuthDispatchType)  => {
    switch(action.type) {
        case LOGIN_SUCCESS : 
            return {
                ...state,
                user : tmp,
                isLoggedIn : true,
                role : action.payload.role
            }
        case LOGIN_FAIL :
            return {
                user :null,
                isLoggedIn : false,
                role : null
            }
        case LOGOUT :
            return {
                role : null,
                isLoggedIn : false,
                user:null
            }
        default :
            return state
        }
};