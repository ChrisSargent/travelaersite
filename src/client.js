import React from 'react'
import ReactDOM, {render} from 'react-dom'
import {Provider} from 'react-redux'
import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'
import configureStore from './store/configureStore'
import routes from './routes'

if (process.env.NODE_ENV === `development`) {
  const wysiwygIgnore = (name, id, msg) => {
    const components = [
      'Wysiwyg',
      'Slider',
      'MenuList',
      'Menu'
    ]
    if (components.indexOf(name) >= 0) {
      return false
    } else {
      return true
    }
  }
  const Perf = require('react-addons-perf')
  const a11y = require('react-a11y')
  window.Perf = Perf
  Perf.start()
  a11y(React, {
    ReactDOM,
    filterFn: wysiwygIgnore,
  })
}

const root = document.getElementById('root')
const hydratedStateEl = document.getElementById('hydrated-state')
const hydratedState = hydratedStateEl
  ? JSON.parse(hydratedStateEl.innerHTML)
  : undefined
const store = configureStore(hydratedState)

render(
  <Provider store={store}>
  <Router routes={routes} history={browserHistory}/>
</Provider>, root)
