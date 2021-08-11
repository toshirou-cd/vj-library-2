import { SET_MESSAGE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT, 
    UserState,
    UserAction} from "../types";
import authService from "../../services/auth/authService";
import { Dispatch } from "react";
import { Action, ActionCreator } from "redux";
import { ThunkDispatch } from "redux-thunk";


interface IActions {
    LOGIN_SUCCESS : string,
    LOGIN_FAIL : string,
    
}

interface ILoginSuccess {
    type : typeof LOGIN_SUCCESS,
    payload:any
}
interface ILoginFailed {
    type : typeof LOGIN_FAIL,
    payload:any
}
interface ISetMessage {
    type : typeof SET_MESSAGE,
    payload:string
}

export const LoginSuccess:ActionCreator<UserAction> = (user : UserState,role:string)  => {
    return {
        type : LOGIN_SUCCESS,
        payload : user,role
    }
}
export const LoginFail:ActionCreator<UserAction> = (user : UserState)  => {
    return {
        type : LOGIN_FAIL
    }
}

export const login = (username:string,password:string) => (dispatch:any ) => {
    return authService.login(username,password)
        .then((data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload:{user:data}
            });

            return Promise.resolve();
        },
            (error) => {
                const message = (
                    error.res && error.res.data &&
                    error.res.data.message) || 
                    error.message ||
                    error.toString();
            return Promise.reject();
            }
        )
        
}
export const logout = () => (dispatch:any) => {
    authService.logout();
    dispatch({
      type: LOGOUT,
    });
  }