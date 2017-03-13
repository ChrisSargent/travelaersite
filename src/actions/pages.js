import axios from 'axios'
import {getRequestedSlug} from '../lib/utils'
import types from '.'

// *****************************************************************************
// ******************************* PAGE ACTIONS ********************************
// *****************************************************************************

// Set the fields we want to fetch for the page
const fields = 'acf,id,link,slug,title,t_display_sub_menu';

// Gets page objects from the WP API
const _getPages = (reqPathname) => {
  var fetchedAllPages = false
  const params = {
    slug: getRequestedSlug(reqPathname),
    fields
  }
  !reqPathname && (fetchedAllPages = false)
  return {
    type: types.FETCH_PAGE,
    payload: axios.get('/wp/v2/pages', {params}),
    meta: {
      id: 'page',
      fetchedAllPages,
      reqPathname
    }
  }
}

// Gets all the pages from the API
export const _backgroundGetPages = (exclude) => {
  const params = {
    fields,
  }

  exclude.length && (params.exclude = exclude.join())

  return {
    type: types.BACKGROUND_FETCH_PAGES,
    payload: axios.get('/wp/v2/pages', {params})
  }
}

// Checks if we are getting or have got all the pages and if not, does it.
export const backgroundFetchPages = () => (dispatch, getState) => {
  var exclude = [];
  const {fetchingAllPages, fetchedAllPages, fetchedPages} = getState().pages
  for (var key in fetchedPages) {
    if (fetchedPages.hasOwnProperty(key)) {
      exclude.push(fetchedPages[key].id)
    }
  }

  if (!fetchingAllPages && !fetchedAllPages)
    return dispatch(_backgroundGetPages(exclude))
}

// Checks if a page exists in the cache and then calls the WP API if not
export const fetchPage = (reqPathname) => (dispatch, getState) => {
  const page = getState().pages.fetchedPages[reqPathname]

  return page
  ? Promise.resolve()
  : dispatch(_getPages(reqPathname))
}
