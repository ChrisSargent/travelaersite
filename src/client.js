import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import Perf from 'react-addons-perf'
import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'
import configureStore from './store/configureStore'
import routes from './routes'

if (process.env.NODE_ENV === `development`) {
  window.Perf = Perf
  Perf.start()
}

var hydratedState = document.getElementById('hydrated-state')
hydratedState
  ? hydratedState = JSON.parse(hydratedState.innerHTML)
  : hydratedState = undefined
const store = configureStore(hydratedState)
const root = document.getElementById('root')

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  root)
