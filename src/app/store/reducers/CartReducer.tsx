import { IBOOK } from '@app/models/book'
import React from 'react'
import { ADD_ITEM, CartDispatchType, CartState, REMOVE_ITEM } from '../types'

const setStorge =(cartItems : IBOOK[] ) => {
    localStorage.setItem('cart',JSON.stringify(cartItems.length > 0 ? cartItems: []))
}
const getStorage = ():IBOOK[] => {
    var books : IBOOK[] = []
    books = JSON.parse((localStorage.getItem('cart') || '{}')) 
    return books
}

const addBookToCart = (cart:IBOOK[],book:IBOOK) : IBOOK[] => [
    ...cart,
    book
]

const innitialValue : CartState = {
    books : getStorage()
}
export const CartReducer = (state:CartState = innitialValue, action:CartDispatchType) => {
    switch(action.type) {
        case ADD_ITEM :
            if(!(state.books.find(x => x.id === action.payload.book.id))) {
                state.books.push(action.payload.book)
            }
            setStorge(state.books)
            return{
                ...state,
                books : [...state.books],
            }    
            case REMOVE_ITEM: 
            // state.books.filter((book : IBOOK)=> book.id !== action.payload.bookId)
            setTimeout(setStorge(state.books),1000)
                return {
                    ...state,
                    books : [...state.books.filter((book : IBOOK)=> book.id !== action.payload.bookId)],
                }
            
        default :
            return state
    }
}

