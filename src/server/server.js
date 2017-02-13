import express from 'express'
import path from 'path'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {match, RouterContext} from 'react-router'
import configureStore from '../store/configureStore'
import configureRoutes from '../configureRoutes'

const app = express()
const PORT = 5000

app.use('/assets', express.static('build/assets'))
app.use('/static', express.static('build/static'))
app.use(handleRender)

function handleRender(req, res) {
  const store = configureStore()
  const routes = configureRoutes(store)
  match({
    routes: routes,
    location: req.url
  }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...props}/>
        </Provider>
      )
      const finalHydrate = store.getState()
      res.send(renderFullPage(html, finalHydrate))
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  })
}

function renderFullPage(html, finalHydrate) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>FECK'S</title>
        <link href="/static/css/main.css" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__HYDRATED_STATE__ = ${JSON.stringify(finalHydrate)}
        </script>
        <script src="/static/js/main.js"></script>
      </body>
    </html>
    `
}

app.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT)
})
