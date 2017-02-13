import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {fetchPage} from './actions/pages'
import {fetchInitPosts, fetchLatestPosts} from './actions/posts'
import {fetchMenu, fetchOptions} from './actions/site'
import {globals} from './lib/utils'
import Base from './views/base'
import Page from './views/page'
import Posts from './views/posts'

const configureRoutes = (store) => {
  
  const updatePage = (prevState, nextState, replace, callback) => {
    var prevPathname = false;
    const newPathname = nextState.location.pathname
    prevState && (prevPathname = prevState.location.pathname)
    prevPathname !== newPathname && (fetchPage(newPathname))
    store.dispatch(fetchPage(newPathname)).then(() => {
      callback()
    })
  }

  const updatePost = (prevState, nextState, replace, callback) => {
    const slug = nextState.params.slug
    slug
      ? store.dispatch(fetchInitPosts(slug)).then(() => {
        callback()
      })
      : store.dispatch(fetchLatestPosts()).then(() => {
        callback()
      })
  }

  const initSite = (callback) => {
    Promise.all([
      store.dispatch(fetchMenu('primary')),
      store.dispatch(fetchOptions()),
    ]).then(() => {
      callback()
    })
  }

  const forceTrailingSlash = (nextState, replace) => {
    const {pathname} = nextState.location;
    if (pathname.slice(-1) !== '/') {
      replace({
        ...nextState.location,
        pathname: pathname + '/'
      });
    }
  }

  const handleSiteChange = (prevState, nextState, replace) => {
    forceTrailingSlash(nextState, replace);
  }

  const handleSiteEnter = (nextState, replace, callback) => {
    forceTrailingSlash(nextState, replace);
    initSite(callback)
  }

  const handlePageChange = (prevState, nextState, replace, callback) => {
    updatePage(prevState, nextState, replace, callback)
  }

  const handlePageEnter = (nextState, replace, callback) => {
    updatePage(false, nextState, replace, callback)
  }

  const handlePostChange = (prevState, nextState, replace, callback) => {
    updatePost(prevState, nextState, replace, callback)
  }

  const handlePostEnter = (nextState, replace, callback) => {
    updatePost(false, nextState, replace, callback)
  }

  return (
    <Route onEnter={handleSiteEnter} onChange={handleSiteChange}>
      <Route path={globals.blogUrl} component={Base} onEnter={handlePostEnter} onChange={handlePostChange}>
        <IndexRoute component={Posts}/>
        <Route path="(:slug)" component={Posts}/>
      </Route>
      <Route onEnter={handlePageEnter} onChange={handlePageChange}>
        <Route path={globals.companyUrl} component={Base}>
          <IndexRoute component={Page}/>
          <Route path="*" component={Page}/>
        </Route>
        <Route path={globals.productsUrl} component={Base}>
          <IndexRoute component={Page}/>
          <Route path="*" component={Page}/>
        </Route>
        <Route path={globals.homeUrl} component={Base}>
          <IndexRoute component={Page}/>
          <Route path="*" component={Page}/>
        </Route>
      </Route>
    </Route>
  )
}

export default configureRoutes
