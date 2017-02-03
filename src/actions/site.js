import axios from 'axios'
import types from '.'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://travelaersite.dev/wordpress/wp-json'
} else {
  axios.defaults.baseURL = 'http://travelaer.stickypixel.com/wordpress/wp-json'
}

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
