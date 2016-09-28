import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Posts from "./views/Posts";
import Layout from "./views/Base";

const app = document.getElementById('root');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Posts}></IndexRoute>
    </Route>
  </Router>,
app);
