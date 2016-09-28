import React from "react";
import ReactDOM from "react-dom";
// import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Router, Route, browserHistory } from "react-router";

import Base from "./views/Base";

const app = document.getElementById('root');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Base}></Route>
    <Route path="/wordpress/" component={Base}></Route>
  </Router>,
app);
