import { combineReducers } from 'redux'

import insta from './insta'
import loading from './loading'
import messages from './messages'
import pages from './pages'
import posts from './posts'
import site from './site'
import sliders from './sliders'
import submit from './submit'

export default combineReducers({
  insta,
  loading,
  messages,
  site,
  pages,
  posts,
  sliders,
  submit,
})
