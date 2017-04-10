import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import match from 'react-router/lib/match'
import RouterContext from 'react-router/lib/RouterContext'
import configureStore from './store/configureStore'
import routes from './routes'
import AppHTML from './server-html'
import Raven from 'raven'

const app = express()
// Needs to be the same port as in the Nginx config
const PORT = 8085

// Raven is for error monitoring
Raven.config('https://51a14cb683344ad1b2f1b64d037d8d88:a1ec292179804b00ac85408031c13d84@sentry.io/156925').install();
app.use(Raven.requestHandler());
app.use('/assets', express.static('build/assets'))
app.use('/static', express.static('build/static'))
app.use(handleRender)
app.use(Raven.errorHandler());

function handleRender(req, res) {
  // TODO: This was a quick fix to prevent the call to the favicon changing the url in the meta info
  if (req.url === '/favicon.ico/') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }
  match({
    routes: routes,
    location: req.url
  }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      Raven.captureException(err);
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
      Raven.captureMessage('404 Error from Express Server')
    }
  })
}

function setGlobals(req) {
  const language = req.headers['accept-language']
    ? req.headers['accept-language'].split(',')[0]
    : 'en-US'
  global.navigator = {
    language
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
    const appHtml = renderToString(
      <AppHTML hydrate={hydrate}>
        <Provider store={store}>
          <RouterContext {...props}/>
        </Provider>
      </AppHTML>
    )
    res.send(doctype + appHtml)
  }).catch((error) => {
    Raven.captureException(error);
    res.sendStatus(500)
  })
}

app.listen(PORT, function() {
  console.log('Server running at localhost:' + PORT)
  Raven.captureMessage('Server running at localhost:' + PORT, {level: 'info'})
})
