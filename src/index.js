import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducers from "./reducers"
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {globals} from './lib/utils'
import BaseContainer from './views/base'
import Page from './views/page'
import Posts from './views/posts'

import {fetchOptions} from './actions/SiteActions'

import './lib/sass/index.sass'

// Define where to render the app
const app = document.getElementById('root')

// Create and populate the Redux store and middleware
const middleware = applyMiddleware(promise(), logger())
let store = createStore(reducers, middleware)
store.dispatch(fetchOptions())

function handleUpdate(a, b) {
  const {action} = this.state.location

  if (action === 'PUSH') {
    window.scrollTo(0, 0)
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={handleUpdate}>
      <Route path={globals.companyUrl} component={BaseContainer}>
        <IndexRoute component={Page}/>
        <Route path="team" component={Page}/>
      </Route>
      <Route path={globals.productsUrl} component={BaseContainer}>
        <IndexRoute component={Page}/>
        <Route path="comversational" component={Page}/>
        <Route path="travel-paas" component={Page}/>
      </Route>
      <Route path={globals.blogUrl} component={BaseContainer}>
        <IndexRoute component={Posts}/>
        <Route path="(:slug)" component={Posts}/>
      </Route>
      <Route path={globals.homeUrl} component={BaseContainer}>
        <IndexRoute component={Page}/>
        <Route path=":slug" component={Page}/>
      </Route>
    </Router>
</Provider>,
app)
