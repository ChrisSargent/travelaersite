import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import globals from './lib/globals';
import Base from './views/base';
import Page from './views/page';
import Posts from './views/posts';
import Post from './views/post';

const app = document.getElementById('root');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={globals.blogUrl} component={Base}>
      <IndexRoute component={Posts} />
      <Route path=":slug" component={Post} />
    </Route>
    <Route path={globals.homeUrl} component={Base}>
      <IndexRoute component={Page} />
      <Route path="/:slug" component={Page} />
    </Route>
  </Router>
  , app);
