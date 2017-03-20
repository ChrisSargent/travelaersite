import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
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

const scrollToTop = () => {
  window.requestAnimationFrame(() => {
    window.scrollTo(0, 0);
  })
}

const handleSiteChange = (prevState, nextState, replace) => {
  (nextState.location.action === 'PUSH') && scrollToTop()
  forceTrailingSlash(nextState, replace)
}

const handleSiteEnter = (nextState, replace) => {
  forceTrailingSlash(nextState, replace)
}

const routes = (
  <Route onEnter={handleSiteEnter} onChange={handleSiteChange} component={Base}>
    <Route path='/blog/'>
      <IndexRoute component={Posts}/>
      <Route path='category/:category' component={Posts}/>
      <Route path="(:slug)" component={Posts}/>
    </Route>
    <Route path='/company/'>
      <IndexRoute component={Page}/>
      <Route path="*" component={Page}/>
    </Route>
    <Route path='/products/'>
      <IndexRoute component={Page}/>
      <Route path="*" component={Page}/>
    </Route>
    <Route path='*'>
      <IndexRoute component={Page}/>
      <Route path="*" component={Page}/>
    </Route>
  </Route>
)

export default routes
