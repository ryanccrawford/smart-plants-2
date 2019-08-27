import React from 'react';
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Admin from "layouts/Admin.js";

import "./assets/css/material-dashboard-react.css?v=1.8.0";
const history = createBrowserHistory();
ReactDOM.render(
    <Router history={history}>
    <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
    </Switch>
</Router>, document.getElementById('root'));


