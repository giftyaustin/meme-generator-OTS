import {createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { memesReducer } from './reducers/memesReducer'
import { useDeferredValue } from 'react'
import { userReducer } from './reducers/userReducer'

const reducer = combineReducers({
    currMemes : memesReducer,
    user:userReducer,
})
const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store