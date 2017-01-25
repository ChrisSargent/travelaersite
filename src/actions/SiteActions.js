import axios from 'axios'
import dispatcher from '../dispatcher'
import {getRequesedSlug} from '../lib/utils'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://travelaersite.dev/wordpress/wp-json'
} else {
  axios.defaults.baseURL = 'http://travelaer.stickypixel.com/wordpress/wp-json'
}

// *****************************************************************************

export function loading(id) {
  dispatcher.dispatch({
    type: 'LOADER',
    loading: true,
    id: 'loading_' + id
  })
  // console.log('Loading:' + id)
}

export function finished(id) {
  dispatcher.dispatch({
    type: 'LOADER',
    loading: false,
    id: 'loading_' + id
  })
  // console.log('Finished:' + id)
}

// *****************************************************************************

export const fetchMenu = (location) => {
  return {
    type: 'FETCH_MENU',
    payload: axios.get('/wp-api-menus/v2/menu-locations/' + location),
    meta: {
      location: location
    }
  }
}

// *****************************************************************************

export const fetchOptions = () => {
  return {type: 'FETCH_OPTIONS', payload: axios.get('/acf/v2/options')}
}

// *****************************************************************************
// ******************************* PAGE ACTIONS ********************************
// *****************************************************************************

const apiGetPage = (slug) => {
  const params = {
    slug: slug,
    fields: 'acf,slug,id,title'
  }
  return {
    type: 'FETCH_PAGE',
    payload: axios.get('/wp/v2/pages', {params})
  }
}

const updateCurrentSlug = (slug) => {
  return {
    type: 'UPDATE_CURRENT_PAGE',
    payload: slug
  }
}

export const fetchPage = (pathname) => (dispatch, getState) => {
  const requestedSlug = getRequesedSlug(pathname)
  const page = getState().pages[requestedSlug]

  if (page) {
    return dispatch(updateCurrentSlug(requestedSlug))
  } else {
    return dispatch(apiGetPage(requestedSlug))
  }
}

// *****************************************************************************

export function resetMessages() {
  dispatcher.dispatch({type: 'RESET_MESSAGE'})
}
