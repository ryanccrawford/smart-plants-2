import React from 'react';
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

//Bring in the main layout
import Admin from "./layouts/Admin.js";
//bring in the material ui dashboard theme
import "./assets/css/material-dashboard-react.css?v=1.8.0";
//needed for the router
const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
    </Router>, document.getElementById('root'));


