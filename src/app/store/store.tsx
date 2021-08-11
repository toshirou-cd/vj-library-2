import { useDispatch } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose, Store } from 'redux'
import thunk from 'redux-thunk'
import {AuthReducer} from './reducers/AuthReducer'
import { DispatchType, UserAction, UserState } from './types'

    const rootReducer = combineReducers({
          AuthReducer,
      })

const initialState = {};
const middleware = [thunk];



export const store:Store<UserState,UserAction> & {dispatch:DispatchType} = createStore(AuthReducer,applyMiddleware(...middleware));

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()