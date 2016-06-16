import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as WalletActions from '../actions/wallet';
import Wallet from '../components/Wallet/Wallet';
import Mnemonic from '../components/Wallet/Mnemonic';

class WalletContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.registerWallet = this.registerWallet.bind(this);
  }

  componentDidMount() {
    if(this.props.create) {
      this.props.dispatch(WalletActions.createWallet());
    }
  }

  registerWallet(mnemonic) {
    this.props.dispatch(WalletActions.saveWallet(mnemonic));
  }

  render() {
    var Wallet = this.props.create ? <Mnemonic register={this.registerWallet} /> : <Wallet />;
    return (
      <div>
        {Wallet}
      </div>
    )
  }
}

WalletContainer.propTypes = {
  wallet: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  create: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(WalletContainer);

