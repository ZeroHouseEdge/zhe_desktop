import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as WalletActions from '../actions/wallet';

class HeaderContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if (this.props.wallet.balance) { return; }
    this.props.dispatch(WalletActions.refreshWallet());
  }

  changeCurrency = (currency) => {
    this.props.dispatch(WalletActions.changeCurrency({from: this.props.wallet.currency, to: currency}, this.props.wallet.balance, this.props.wallet.unconfirmed, this.props.wallet.rate))
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


