import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import promise from 'redux-promise-middleware'
import Raven from 'raven-js'
import createRavenMiddleware from 'raven-for-redux';
import reducers from '../reducers'

const _removeFields = (items, fields) => {
  var modItems = {};
  for (let item in items) {
    if (items.hasOwnProperty(item)) {
      modItems[item] = Object.keys(items[item]).reduce((result, key) => {
        !fields.includes(key) && (result[key] = items[item][key])
        return result;
      }, {})
    }
  }
  return modItems
}

const _ravenStateTransform = (state) => {
  const stateForRaven = {
    ...state,
    pages: {
      ...state.pages,
      fetchedPages: {
        ..._removeFields(state.pages.fetchedPages, 'acf')
      }
    },
    posts: {
      ...state.posts,
      fetchedPosts: {
        ..._removeFields(state.posts.fetchedPosts, ['acf', 'content', 't_author', 't_categories', 't_comments_info', 't_featured_image'])
      }
    }
  }
  return stateForRaven
}

const configureStore = (hydratedState) => {
  var middleware = [promise(), thunk];

  if (process.env.NODE_ENV === 'development') {
    middleware = [
      ...middleware,
      createLogger()
    ];
  }
  else {
    Raven.config('https://51a14cb683344ad1b2f1b64d037d8d88@sentry.io/156925', {release: process.env.PACKAGE.version}).install()
    middleware = [
      ...middleware,
      createRavenMiddleware(Raven, {
        stateTransformer: _ravenStateTransform
      })
    ];
  }

  return createStore(reducers, hydratedState, applyMiddleware(...middleware))
}

export default configureStore
