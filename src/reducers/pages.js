import types from '../actions'
import {stripDomain} from '../lib/utils'

export const getPage = ({pages}, pathname) => {
  return pages[pathname]
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

const addPages = (pages, state) => {
  var pageArray = []
  // Puts each page in to an array, indexed by its slug
  for (var i = 0; i < pages.length; i++) {
    const page = pages[i]
    const pathname = stripDomain(page.link)
    !state[pathname] && (pageArray[pathname] = page)
  }
  return pageArray
}

const pages = (state = {
  fetchedAllPages: false,
  fetchingAllPages: false
}, action) => {

  switch (action.type) {
    case types.FETCH_PAGE + '_FULFILLED':
      const page = action.payload.data
      const pageArray = addPages(page, state)
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
      const pages = action.payload.data
      const pagesArray = addPages(pages, state)
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
