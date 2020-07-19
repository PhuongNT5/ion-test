import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import Layout from "./layout/Layout.jsx";
import Detail from './views/Detail.jsx';
import NotFound from './views/NotFound.jsx';
import Home from './views/Home.jsx';

ReactDOM.render(
  <BrowserRouter>
    <Layout />
    <Switch>
      <Route path="/" component={Home} exact={true} />
      <Route path="/detail" component={Detail} exact={true} />
      <Route path="/:id" component={Detail} exact={true} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  ,
  document.getElementById('root'));