import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import SignupContainer from './containers/SignupContainer';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/signup" component={SignupContainer} />
    <Route path="/signup/create" component={SignupContainer} />
    <Route path="/signup/load" component={SignupContainer} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
