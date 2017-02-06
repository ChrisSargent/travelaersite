import axios from 'axios'
import types from '.'
import {globals} from '../lib/utils'

axios.defaults.baseURL = globals.wpFolder + '/wp-json'

// *****************************************************************************
// ******************************* SITE ACTIONS ********************************
// *****************************************************************************

export const fetchMenu = (location) => ({
  type: types.FETCH_MENU,
  payload: axios.get('/wp-api-menus/v2/menu-locations/' + location),
  meta: {
    location,
    id: 'menu'
  }
})

export const fetchOptions = () => ({
  type: types.FETCH_OPTIONS,
  payload: axios.get('/acf/v2/options'),
  meta: {
    id: 'options'
  }
})
