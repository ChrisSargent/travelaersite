import React from 'react'
import store from './store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {fetchOptions} from './actions/site'
import {globals} from './lib/utils'
import Base from './views/base'
import Page from './views/page'
import Posts from './views/posts'
import './lib/sass/index.sass'

// Define where to render the app
const app = document.getElementById('root')

// Populate the Redux store with site options
store.dispatch(fetchOptions())

function handleUpdate() {
  const {action} = this.state.location
  action === 'PUSH' && (window.scrollTo(0, 0))
}

function forceTrailingSlash(nextState, replace) {
  const path = nextState.location.pathname;
  if (path.slice(-1) !== '/') {
    replace({
      ...nextState.location,
      pathname: path + '/'
    });
  }
}

function forceTrailingSlashOnChange(prevState, nextState, replace) {
  forceTrailingSlash(nextState, replace);
}

render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={handleUpdate}>
      <Route onEnter={forceTrailingSlash} onChange={forceTrailingSlashOnChange}>
        <Route path={globals.companyUrl} component={Base}>
          <IndexRoute component={Page}/>
          <Route path="*" component={Page}/>
        </Route>
        <Route path={globals.productsUrl} component={Base}>
          <IndexRoute component={Page}/>
          <Route path="*" component={Page}/>
        </Route>
        <Route path={globals.blogUrl} component={Base}>
          <IndexRoute component={Posts}/>
          <Route path="(:slug)" component={Posts}/>
        </Route>
        <Route path={globals.homeUrl} component={Base}>
          <IndexRoute component={Page}/>
          <Route path="*" component={Page}/>
        </Route>
      </Route>
    </Router>
</Provider>,
app)
