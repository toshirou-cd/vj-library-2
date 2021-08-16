import { combineReducers, configureStore, EnhancedStore, } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import { useDispatch, } from 'react-redux'
import { createStore, applyMiddleware, Store, AnyAction, $CombinedState, Action, CombinedState} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import './reducers/RootReducer'
import RootReducer from './reducers/RootReducer'
import { UserState } from './types'


import { AuthReducer } from './reducers/AuthReducer'
const middleware = [thunk];
const store = createStore(RootReducer,applyMiddleware(thunk))

export default store
export type RootStore = ReturnType<typeof RootReducer>

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()