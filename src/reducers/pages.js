import types from '../actions'

export const getPage = ({pages}) => {
  return pages[pages.currentPageSlug]
}

export const getPageAppend = ({pages}) => {
  return pages.currentPageSlug
    ? pages[pages.currentPageSlug].acf.footerAppend
    : false
}

export const getFetchedAllPages = ({pages}) => {
  return pages.fetchedAllPages
}

const addAllPages = (pages, state) => {
  // Puts each page in to an array, indexed by its slug
  for (var i = 0; i < pages.length; i++) {
    const page = pages[i]
    if (!state[page.slug]) {
      state = {
        ...state,
        [page.slug]: page,
        fetchedAllPages: true,
        fetchingAllPages: false
      }
    }
  }
  return state
}

const pages = (state = {
  currentPageSlug: null,
  fetchedAllPages: false,
  fetchingAllPages: false,
}, action) => {

  switch (action.type) {
    case types.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPageSlug: action.payload
      }

    case types.FETCH_PAGE + '_FULFILLED':
      const page = action.payload.data[0]
      return {
        ...state,
        [page.slug]: page,
        currentPageSlug: page.slug,
      }

    case types.BACKGROUND_FETCH_PAGES + '_PENDING':
      return {
        ...state,
        fetchingAllPages: true
      }

    case types.BACKGROUND_FETCH_PAGES + '_FULFILLED':
      const pages = action.payload.data
      return addAllPages(pages, state)

    default:
      break
  }

  return state
}

export default pages
