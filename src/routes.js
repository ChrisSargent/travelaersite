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

const scrollToTop = () => {
  var time = globals.pageTr
  const interval = 1 / 60 * 1000
  const tick = () => {
    const distanceToTop = window.scrollY
    const speed = (distanceToTop / time) * interval

    if (time > 0) {
      window.requestAnimationFrame(tick);
      window.scrollTo(0, distanceToTop - speed);
    } else {
      window.scrollTo(0, 0);
    }
    time -= interval;
  }
  tick();
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
