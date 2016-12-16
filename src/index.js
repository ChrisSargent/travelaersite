import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import globals from './lib/globals';
import Base from './views/base';
import Page from './views/page';
// import Posts from './views/posts';
import SinglePost from './views/single-post';

const app = document.getElementById('root');

function handleUpdate(a, b) {
  const {action} = this.state.location;

  if (action === 'PUSH') {
    window.scrollTo(0, 0);
  }
}

ReactDOM.render(
  <Router history={browserHistory} onUpdate={handleUpdate}>
  <Route path={globals.companyUrl} component={Base}>
    <Route path="(:slug)" component={Page}/>
  </Route>
  <Route path={globals.productsUrl} component={Base}>
    <Route path="(:slug)" component={Page}/>
  </Route>
  <Route path={globals.blogUrl} component={Base}>
    <IndexRoute component={SinglePost}/>
    <Route path="(:slug)" component={SinglePost}/>
  </Route>
  <Route path={globals.homeUrl} component={Base}>
    <IndexRoute component={Page}/>
    <Route path=":slug" component={Page}/>
  </Route>
</Router>, app);
