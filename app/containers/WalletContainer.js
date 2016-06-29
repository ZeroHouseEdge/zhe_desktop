import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import * as WalletActions from '../actions/wallet';
import Wallet from '../components/Wallet/Wallet';
import WalletHelper from '../helpers/wallet/main';
import two1wallet from '/Users/jackmallers/.two1/wallet/default_wallet.json';
import HeaderContainer from './HeaderContainer';
import * as API from '../helpers/two1wallet/main';
import PythonShell from 'python-shell';

class WalletContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>
        <HeaderContainer />
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

