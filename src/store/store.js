import {createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { memesReducer } from './reducers/memesReducer'
import { userReducer } from './reducers/userReducer'

import { btnLoadingReducer } from './reducers/btnLoadingReducer'

const reducer = combineReducers({
    currMemes : memesReducer,
    user:userReducer,
    button:btnLoadingReducer,
})
const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store