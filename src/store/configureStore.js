import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import promise from 'redux-promise-middleware'
import Raven from 'raven-js'
import createRavenMiddleware from 'raven-for-redux';
import reducers from '../reducers'

const _ravenBreadcrumbData = (action) => {
  return action.type
}

// const _ravenStateTransform = (state) => {
// const newState = {...state, new: true}
// for (var acf in newState.pages.fetchedPages) {
//   if (newState.pages.fetchedPages.hasOwnProperty(acf)) {
//     delete newState.pages.fetchedPages[acf]['acf']
//   }
// }
// for (var content in newState.posts.fetchedPosts) {
//   if (newState.posts.fetchedPosts.hasOwnProperty(content)) {
//     delete newState.posts.fetchedPosts[content]['content']
//     delete newState.posts.fetchedPosts[content]['t_author']
//     delete newState.posts.fetchedPosts[content]['t_categories']
//     delete newState.posts.fetchedPosts[content]['t_comments_info']
//     delete newState.posts.fetchedPosts[content]['t_featured_image']
//   }
// }
// console.log('Original: ', state)
// console.log('New: ', newState)

//   return state
// }

const configureStore = (hydratedState) => {
  Raven.config('https://51a14cb683344ad1b2f1b64d037d8d88@sentry.io/156925').install()

  var middleware = [
    promise(),
    thunk,
    createRavenMiddleware(Raven, {breadcrumbDataFromAction: _ravenBreadcrumbData})
  ];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middleware = [
      ...middleware,
      logger
    ];
  }

  const store = createStore(reducers, hydratedState, applyMiddleware(...middleware))

  return store
}

export default configureStore
