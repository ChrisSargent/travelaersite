import axios from 'axios'
import {getRequestedSlug} from '../lib/utils'
import types from '.'

// *****************************************************************************
// ******************************* PAGE ACTIONS ********************************
// *****************************************************************************

// Set the fields we want to fetch for the page
const fields = 'acf,slug,id,title,t_display_sub_menu';

// Updates the current slug in the state
const _updateCurrentSlug = (slug) => ({type: types.UPDATE_CURRENT_PAGE, payload: slug})

// Gets a single page object from the WP API
const _getPages = (slug) => {
  var fetchedAllPages = false
  const params = {
    slug,
    fields,
  }
  !slug && (fetchedAllPages = false)
  return {
    type: types.FETCH_PAGE,
    payload: axios.get('/wp/v2/pages', {params}),
    meta: {
      id: 'page',
      fetchedAllPages
    }
  }
}

// Gets all the pages from the API
export const _backgroundGetPages = () => {
  const params = {
    fields
  }
  return {
    type: types.BACKGROUND_FETCH_PAGES,
    payload: axios.get('/wp/v2/pages', {params}),
  }
}

// Checks if we are getting or have got all the pages and if not, does it.
export const backgroundFetchPages = () => (dispatch, getState) => {
  const {fetchingAllPages, fetchedAllPages} = getState().pages

  if (fetchingAllPages || fetchedAllPages) {
    return null
  } else {
    return dispatch(_backgroundGetPages())
  }
}

// Checks if a page exists in the cache and then calls the WP API if not
export const fetchPage = (pathname) => (dispatch, getState) => {
  const requestedSlug = getRequestedSlug(pathname)
  const page = getState().pages[requestedSlug]

  if (page) {
    return dispatch(_updateCurrentSlug(requestedSlug))
  } else {
    return dispatch(_getPages(requestedSlug))
  }
}

// *****************************************************************************
