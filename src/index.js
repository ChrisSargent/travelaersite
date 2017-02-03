import React from 'react'
import store from './store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {fetchOptions} from './actions/site'
import {globals} from './lib/utils'
import {observableFonts} from './lib/css'
import FontFaceObserver from 'fontfaceobserver'
import Base from './views/base'
import Page from './views/page'
import Posts from './views/posts'
import './lib/sass/index.sass'

// Define where to render the app
const app = document.getElementById('root')

// Populate the Redux store with site options
store.dispatch(fetchOptions())

function handleUpdate() {
  const {action} = this.state.location
  action === 'PUSH' && (window.scrollTo(0, 0))
}

(function observeFonts() {
  observableFonts.map((font) => {
    const observedFont = new FontFaceObserver(font.family);
    observedFont.load(null, 5000).then(() => {
      document.body.className += ' ' + font.id;
    }, () => {
      console.log(font.family + ' is not available after waiting 5 seconds');
    });
    return observedFont
  })
})()

render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={handleUpdate}>
      <Route path={globals.companyUrl} component={Base}>
        <IndexRoute component={Page}/>
        <Route path="team" component={Page}/>
        <Route path="story" component={Page}/>
      </Route>
      <Route path={globals.productsUrl} component={Base}>
        <IndexRoute component={Page}/>
        <Route path="comversational" component={Page}/>
        <Route path="travel-paas" component={Page}/>
      </Route>
      <Route path={globals.blogUrl} component={Base}>
        <IndexRoute component={Posts}/>
        <Route path="(:slug)" component={Posts}/>
      </Route>
      <Route path={globals.homeUrl} component={Base}>
        <IndexRoute component={Page}/>
        <Route path=":slug" component={Page}/>
      </Route>
    </Router>
</Provider>,
app)
