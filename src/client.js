import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'
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
