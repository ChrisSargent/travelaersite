import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import promise from "redux-promise-middleware"
import reducers from "./reducers"

let middleware = [promise(), thunk];

if (process.env.NODE_ENV === `development`) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middleware = [...middleware, logger];
}

const store = createStore(reducers, applyMiddleware(...middleware))
export default store
