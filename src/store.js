import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducers from "./reducers"

// Create and populate the Redux store and middleware
const middleware = applyMiddleware(promise(), thunk, logger())

export default createStore(reducers, middleware);
