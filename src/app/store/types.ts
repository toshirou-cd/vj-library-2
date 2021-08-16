import { IBOOK } from "@app/models/book";

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


export interface AuthSuccess {
    type: typeof LOGIN_SUCCESS,
    payload: {
        user : IUser,
        role :string
    }
}
export interface AuthFail {
    type: typeof LOGIN_FAIL,
}
export interface Logout {
    type: typeof LOGOUT  
}
export type AuthDispatchType = AuthSuccess | AuthFail | Logout

//// cart
export const ADD_ITEM = "ADD ITEM"
export const REMOVE_ITEM = "REMOVE ITEM"

 export type CartState = {
    books : IBOOK[] 
}

export interface AddItemToCart{
    type: typeof ADD_ITEM,
    payload : {
        book : IBOOK | any
    } 
}
export interface RemoveItemFromCart{
    type : typeof REMOVE_ITEM,
    payload : {
        bookId :string
    }
}
export type CartDispatchType = AddItemToCart | RemoveItemFromCart
