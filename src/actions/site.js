import axios from 'axios'
import Raven from 'raven-js'
import types from '.'
import {globals} from '../lib/utils'

axios.defaults.baseURL = globals.baseUrl + '/wp-json'
axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    Raven.captureException(error)
    return Promise.reject(error);
  });

// *****************************************************************************
// ******************************* SITE ACTIONS ********************************
// *****************************************************************************

export const fetchMenu = (location) => (dispatch, getState) => {
  const menu = getState().site.menu

  return menu
    ? Promise.resolve()
    : dispatch({
      type: types.FETCH_MENU,
      payload: axios.get('/wp-api-menus/v2/menu-locations/' + location),
      meta: {
        id: 'menu'
      }
    })
}

export const fetchOptions = () => (dispatch, getState) => {
  const options = getState().site.options

  return options
    ? Promise.resolve()
    : dispatch({
      type: types.FETCH_OPTIONS,
      payload: axios.get('/acf/v2/options'),
      meta: {
        id: 'options'
      }
    })
}
