import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import * as WalletActions from '../actions/wallet';
import Wallet from '../components/Wallet/Wallet';
import WalletHelper from '../helpers/wallet/main';
import two1wallet from '/Users/jackmallers/.two1/wallet/default_wallet.json';
import Header from '../components/Header';
import * as API from '../helpers/two1wallet/main';
import PythonShell from 'python-shell';

class WalletContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.dispatch(WalletActions.registerWallet())
    API.fetchTwo1(['balance', 'get_payout_address', 'transaction_history']).then((results) => {
      this.props.dispatch(WalletActions.walletRegistered(results[0].balance, results[1].get_payout_address));
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Wallet />
      </div>
    )
  }
}

WalletContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(WalletContainer);

