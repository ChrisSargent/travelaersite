import axios from 'axios'
import store from '../store'
import {getRequesedSlug} from '../lib/utils'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://travelaersite.dev/wordpress/wp-json'
} else {
  axios.defaults.baseURL = 'http://travelaer.stickypixel.com/wordpress/wp-json'
}

// *****************************************************************************
// ******************************* SITE ACTIONS ********************************
// *****************************************************************************

export const fetchMenu = (location) => {
  return {
    type: 'FETCH_MENU',
    payload: axios.get('/wp-api-menus/v2/menu-locations/' + location),
    meta: {
      location: location,
      id: 'menu'
    }
  }
}

export const fetchOptions = () => {
  return {
    type: 'FETCH_OPTIONS',
    payload: axios.get('/acf/v2/options'),
    meta: {
      id: 'options'
    }
  }
}

// *****************************************************************************
// ******************************* PAGE ACTIONS ********************************
// *****************************************************************************

// Gets a single page object from the WP API
const _getPage = (slug) => {
  const params = {
    slug: slug,
    fields: 'acf,slug,id,title'
  }
  return {
    type: 'FETCH_PAGE',
    payload: axios.get('/wp/v2/pages', {params}),
    meta: {
      id: 'page'
    }
  }
}

// Updates the current slug in the state
const _updateCurrentSlug = (slug) => {
  return {type: 'UPDATE_CURRENT_PAGE', payload: slug}
}

// Checks if a page exists in the cache and then calls the WP API if not
export const fetchPage = (pathname) => (dispatch, getState) => {
  const requestedSlug = getRequesedSlug(pathname)
  const page = getState().pages[requestedSlug]

  if (page) {
    return dispatch(_updateCurrentSlug(requestedSlug))
  } else {
    return dispatch(_getPage(requestedSlug))
  }
}

// *****************************************************************************
