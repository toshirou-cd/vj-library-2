import { SET_MESSAGE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT, 
    UserState,
    AuthDispatchType,
    IUser} from "../types";
import authService from "../../services/auth/authService";
import { Dispatch } from "react";
import { Action, ActionCreator } from "redux";
import { ThunkDispatch } from "redux-thunk";
interface IActions {
    LOGIN_SUCCESS : string,
    LOGIN_FAIL : string,
}

export const LoginSuccess = (user : IUser,role:string) => (dispath : Dispatch<AuthDispatchType>)  => {
    dispath ({
        type : LOGIN_SUCCESS,
        payload: {
            user : user,
            role : role
    }
})
}
export const LoginFail = () => (dispatch: Dispatch<AuthDispatchType>) => {
    dispatch({
        type : LOGIN_FAIL
    }) 
}

// export const login = (username:string,password:string) => (dispatch:any ) => {
//     return authService.login(username,password)
//         .then((data) => {
//             dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload:{user:data}
//             });

//             return Promise.resolve();
//         },
//             (error) => {
//                 const message = (
//                     error.res && error.res.data &&
//                     error.res.data.message) || 
//                     error.message ||
//                     error.toString();
//             return Promise.reject();
//             }
//         )
        
// }
export const logout = () => (dispatch:Dispatch<AuthDispatchType>) => {
    authService.logout();
    dispatch({
      type: LOGOUT
    })
}