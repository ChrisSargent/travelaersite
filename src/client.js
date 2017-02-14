import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import configureStore from './store/configureStore'
import routes from './routes'

const hydratedState = window.__HYDRATED_STATE__
const store = configureStore(hydratedState)
const root = document.getElementById('root')

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  root)
