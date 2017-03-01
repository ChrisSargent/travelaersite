import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import promise from 'redux-promise-middleware'
import reducers from '../reducers'
import createLogger from 'redux-logger';

const analytics = () => next => action => {
  const dataLayer = window.dataLayer || [];
  dataLayer.push({
    event: action.type,
  });
  return next(action);
};

const configureStore = (hydratedState) => {
  var middleware = [promise(), thunk, analytics];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middleware = [...middleware, logger];
  }

  const store = createStore(
    reducers,
    hydratedState,
    applyMiddleware(...middleware)
  )

  return store
}

export default configureStore
