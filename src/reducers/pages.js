import types from '../actions'
import {stripDomain, whichContent} from '../lib/utils'
import he from 'he'

export const getPage = ({pages}, pathname) => {
  const page = pages[pathname]
  return page
}

export const getPageAppend = ({pages}, pathname) => {
  return pages[pathname]
    ? pages[pathname].acf.footerAppend
    : false
}

export const getFetchedAllPages = ({pages}) => {
  return pages.fetchedAllPages
}

export const getDisplaySubmenu = ({pages}, pathname) => {
  return pages[pathname]
    ? pages[pathname].t_display_sub_menu
    : false
}

const _addPages = (action, state) => {
  const pages = action.payload.data
  var pageArray = []
  // Puts each page in to an array, indexed by its slug
  if (pages.length) {
    for (var i = 0; i < pages.length; i++) {
      const page = pages[i]
      const pathname = stripDomain(page.link)
      page.title = he.decode(whichContent(page.title))
      !state[pathname] && (pageArray[pathname] = page)
    }
  } else {
    pageArray[action.meta.reqPathname] = {invalid: true};
  }
  return pageArray
}

const pages = (state = {
  fetchedAllPages: false,
  fetchingAllPages: false,
}, action) => {

  switch (action.type) {
    case types.FETCH_PAGE + '_FULFILLED':
      const pageArray = _addPages(action, state)
      return {
        ...state,
        ...pageArray,
      }

    case types.BACKGROUND_FETCH_PAGES + '_PENDING':
      return {
        ...state,
        fetchingAllPages: true
      }

    case types.BACKGROUND_FETCH_PAGES + '_FULFILLED':
      const pagesArray = _addPages(action, state)
      return {
        ...state,
        ...pagesArray,
        fetchedAllPages: true,
        fetchingAllPages: false
      }

    default:
      break
  }

  return state
}

export default pages
