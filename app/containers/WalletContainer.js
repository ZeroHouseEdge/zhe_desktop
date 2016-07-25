import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import * as WalletActions from '../actions/wallet';
import Wallet from '../components/Wallet/Wallet';
import FontAwesome from 'react-fontawesome';
import HeaderContainer from './HeaderContainer';
import PythonShell from 'python-shell';
import styles from '../components/Wallet/Wallet.css';

class WalletContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { tx_history: [] }
  }

  refresh = () => {
    this.props.dispatch(WalletActions.refreshWallet());
  };

  render() {
    return (
      <div>
        {
          this.props.wallet.isLoading ?
          <div className={styles.loading}>
            <FontAwesome name='refresh fa-spin' />
          </div>
          : <Wallet refresh={this.refresh} />
        }
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

