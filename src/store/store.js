import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { userReducer } from './user.reducer'


const mainReducer = combineReducers({
    userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(mainReducer, composeEnhancers())

