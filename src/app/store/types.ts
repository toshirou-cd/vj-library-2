//user reducer types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";


//UI reducer types
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

///
export interface IUser {
    avatar: string | null,
    birth: string | null,
    department: string 
}
export type UserState = {
    user : IUser | null,
    isLoggedIn : boolean,
    role : string |null
}

export type UserAction = {
    type: string,
    payload? : UserState
}
export type DispatchType = ( args : UserAction) => UserAction

