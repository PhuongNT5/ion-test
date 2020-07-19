import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import Index from './index.js';

ReactDOM.render(

  <BrowserRouter>
    <Index />
    {/* <Layout />
    <Switch>
      <Route path="/" component={Home} exact={true} />
      <Route path="/detail" component={Detail} exact={true} />
      <Route path="/:id" component={Detail} exact={true} />
      <Route component={NotFound} />
    </Switch> */}
  </BrowserRouter>
  ,
  document.getElementById('root'));