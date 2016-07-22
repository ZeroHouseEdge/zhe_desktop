import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import WalletContainer from './containers/WalletContainer';
import WagerContainer from './containers/WagerContainer';
import CasinoContainer from './containers/CasinoContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/wallet" component={WalletContainer} />
    <Route path="/wager/:wager_id" component={WagerContainer} />

    <Route path="/casino" component={CasinoContainer} />
  </Route>
);
