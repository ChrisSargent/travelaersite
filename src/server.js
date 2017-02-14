import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import match from 'react-router/lib/match'
import RouterContext from 'react-router/lib/RouterContext'
import configureStore from './store/configureStore'
import routes from './routes'
import AppHTML from './indexHTML';

const app = express()
const PORT = 5000

app.use('/assets', express.static('build/assets'))
app.use('/static', express.static('build/static'))
app.use(handleRender)

function handleRender(req, res) {
  match({
    routes: routes,
    location: req.url
  }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.sendStatus(500)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render
      setGlobals(req)
      hydrateAndRender(res, props)
    } else {
      // no errors, no redirect, we just didn't match anything
      res.sendStatus(404)
    }
  })
}

function setGlobals(req) {
  global.navigator = {
    userAgent: req.headers['user-agent'],
    language: req.headers['accept-language'].split(',')[0]
  }
}

function hydrateAndRender(res, props) {
  const store = configureStore()
  let filteredComps = props.components.filter(component => component !== undefined)
  filteredComps = filteredComps.filter(component => component.fetchData)

  const fetchDataArray = filteredComps.map(component => {
    return component.fetchData(store, props)
  })

  return Promise.all(fetchDataArray).then(() => {
    const doctype = '<!doctype html>'
    const hydrate = store.getState()
    const testing = renderToString(
      <AppHTML hydrate={hydrate}>
        <Provider store={store}>
          <RouterContext {...props}/>
        </Provider>
      </AppHTML>
    )
    res.send(doctype + testing)
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500)
  })
}

app.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT)
})
