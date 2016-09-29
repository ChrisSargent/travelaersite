import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Base from './views/base';
import Page from './views/page';

const app = document.getElementById('root');

const pageID = {
  home: 5,
  products: 7,
  blog: 24,
  company: 14,
  contactUs: 16,
  comversational: 12,
  travelPaas: 9
};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Base}>
      <IndexRoute component={Page} pageID={pageID.home}/>
      <Route path="/products" component={Page} pageID={pageID.products}></Route>
    </Route>
  </Router>
  , app);
