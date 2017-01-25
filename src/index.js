import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducers from "./reducers"
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {globals} from './lib/utils'
import Base from './views/base'
import Page from './views/page'
import Posts from './views/posts'

import {fetchOptions} from './actions/SiteActions'

import './lib/sass/index.sass'

// Define where to render the app
const app = document.getElementById('root')

// Create and populate the Redux store and middleware
const middleware = applyMiddleware(promise(), thunk, logger())
let store = createStore(reducers, middleware)
store.dispatch(fetchOptions())

function handleUpdate() {
  const {action} = this.state.location
  action === 'PUSH' && (window.scrollTo(0, 0))
}

render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={handleUpdate}>
      <Route path={globals.companyUrl} component={Base}>
        <IndexRoute component={Page}/>
        <Route path="team" component={Page}/>
      </Route>
      <Route path={globals.productsUrl} component={Base}>
        <IndexRoute component={Page}/>
        <Route path="comversational" component={Page}/>
        <Route path="travel-paas" component={Page}/>
      </Route>
      <Route path={globals.blogUrl} component={Base}>
        <IndexRoute component={Posts}/>
        <Route path="(:slug)" component={Posts}/>
      </Route>
      <Route path={globals.homeUrl} component={Base}>
        <IndexRoute component={Page}/>
        <Route path=":slug" component={Page}/>
      </Route>
    </Router>
</Provider>,
app)
