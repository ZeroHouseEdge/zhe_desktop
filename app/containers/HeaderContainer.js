import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as WalletActions from '../actions/wallet';
import * as API from '../helpers/two1wallet/main';

class HeaderContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if (this.props.wallet.balance) { return; }
    this.props.dispatch(WalletActions.registerWallet())
    API.fetchTwo1(['balance', 'get_payout_address', 'USD']).then((results) => {
      this.props.dispatch(WalletActions.walletRegistered(results[0].balance, results[1].get_payout_address, results[2]));
    });
  }

  changeCurrency = (currency) => {
    this.props.dispatch(WalletActions.changeCurrency({from: this.props.wallet.currency, to: currency}, this.props.wallet.balance, this.props.wallet.rate))
  };

  render() {
    return (
      <Header changeCurrency={this.changeCurrency} />
    );
  }
}

HeaderContainer.contextTypes = {
  router: function () {
    return React.PropTypes.func.isRequired;
  }
};

HeaderContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(HeaderContainer);


