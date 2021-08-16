import { IBOOK } from "@app/models/book";
import { Dispatch } from "react";
import { ADD_ITEM, CartDispatchType, REMOVE_ITEM } from "../types";

export const addBookToCart = (book : IBOOK) => (dispatch : Dispatch<CartDispatchType>) => {
    dispatch({
        type : ADD_ITEM,
        payload : {
            book : book
        }
    })
}
export const removeItemFromCart = (id : string ) => (dispatch : Dispatch<CartDispatchType>) => {
    dispatch({
        type: REMOVE_ITEM,
        payload : {
            bookId : id
        }
    })
}