import { combineReducers } from 'redux'

import site from './site'
import pages from './pages'
import loading from './loading'
import insta from './insta'

export default combineReducers({
  site,
  pages,
  loading,
  insta
})
