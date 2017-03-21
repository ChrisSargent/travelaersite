import types from '../actions'
import {toRelative, whichContent} from '../lib/utils'
import he from 'he'

export const getPage = ({pages}, pathname) => {
  const page = pages.fetchedPages[pathname]
  return page
}

export const getPageAppend = ({pages}, pathname) => {
  return pages.fetchedPages[pathname]
    ? pages.fetchedPages[pathname].acf.footerAppend
    : false
}

export const getFetchedAllPages = ({pages}) => {
  return pages.fetchedAllPages
}

export const getDisplaySubmenu = ({pages}, pathname) => {
  return pages.fetchedPages[pathname]
    ? pages.fetchedPages[pathname].t_display_sub_menu
    : false
}

const _addPages = (action, state) => {
  const pages = action.payload.data
  var pageObj = {}
  // Puts each page in to an object, indexed by its slug
  if (pages.length) {
    for (var i = 0; i < pages.length; i++) {
      const page = pages[i]
      const pathname = toRelative(page.link)
      page.title = he.decode(whichContent(page.title))
      pageObj[pathname] = page
    }
  } else {
    pageObj[action.meta.reqPathname] = {invalid: true};
  }
  return pageObj
}

const pages = (state = {
  fetchedAllPages: false,
  fetchingAllPages: false,
  fetchedPages: {},
}, action) => {

  switch (action.type) {
    case types.FETCH_PAGE + '_FULFILLED':
      const pageObj = _addPages(action, state)
      return {
        ...state,
        fetchedPages: {...state.fetchedPages, ...pageObj}
      }

    case types.BACKGROUND_FETCH_PAGES + '_PENDING':
      return {
        ...state,
        fetchingAllPages: true
      }

    case types.BACKGROUND_FETCH_PAGES + '_FULFILLED':
      const pagesObj = _addPages(action, state)
      return {
        ...state,
        fetchedPages: {...state.fetchedPages, ...pagesObj},
        fetchedAllPages: true,
        fetchingAllPages: false
      }

    default:
      break
  }

  return state
}

export default pages
