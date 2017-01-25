import { combineReducers } from 'redux'

import insta from './insta'
import loading from './loading'
import messages from './messages'
import pages from './pages'
import site from './site'
import submit from './submit'

export default combineReducers({
  insta,
  loading,
  messages,
  site,
  pages,
  submit,
})
