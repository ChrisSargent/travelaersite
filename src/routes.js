import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import {globals} from './lib/utils'
import Base from './views/base'
import Page from './views/page'
import Posts from './views/posts'

const forceTrailingSlash = (nextState, replace) => {
  const {pathname} = nextState.location
  if (pathname.slice(-1) !== '/') {
    replace({
      ...nextState.location,
      pathname: pathname + '/'
    })
  }
}

const scrollToTop = (nextState) => {
  const {action} = nextState.location
  action === 'PUSH' && (window.scrollTo(0, 0))
}

const handleSiteChange = (prevState, nextState, replace) => {
  forceTrailingSlash(nextState, replace)
  scrollToTop(nextState)
}

const handleSiteEnter = (nextState, replace) => {
  forceTrailingSlash(nextState, replace)
}

const routes = (
  <Route onEnter={handleSiteEnter} onChange={handleSiteChange} component={Base}>
    <Route path={globals.blogUrl}>
      <IndexRoute component={Posts}/>
      <Route path="(:slug)" component={Posts}/>
    </Route>
    <Route path={globals.companyUrl}>
      <IndexRoute component={Page}/>
      <Route path="*" component={Page}/>
    </Route>
    <Route path={globals.productsUrl}>
      <IndexRoute component={Page}/>
      <Route path="*" component={Page}/>
    </Route>
    <Route path={globals.homeUrl}>
      <IndexRoute component={Page}/>
      <Route path="*" component={Page}/>
    </Route>
  </Route>
)

export default routes
