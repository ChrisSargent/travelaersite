import { combineReducers } from 'redux'

import site from './site'
import pages from './pages'

export default combineReducers({
  site,
  pages
})
