import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Base from './views/base';
import Page from './views/page';

const app = document.getElementById('root');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Base}>
      <IndexRoute component={Page} />
      <Route path="/:slug" component={Page} />
    </Route>
  </Router>
  , app);
