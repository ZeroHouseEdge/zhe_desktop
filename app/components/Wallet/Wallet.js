import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import bitcoin from 'bitcoinjs-lib';

class Wallet extends Component {
   constructor(props, context) {
      super(props, context);
   }

   render() {
      return (
         <div>
            <h1>Your wallet</h1>
            <p>
            {
              this.props.wallet.isLoading ? 'Loading...' : null
            }
            </p>
            <p>
            {
              this.props.wallet.balance ? this.props.wallet.balance : null
            }
            </p>
            <p>
            {
              this.props.wallet.address ? this.props.wallet.address : null
            }
            </p>
         </div>
      );
   }
}

Wallet.propTypes = {
  wallet: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    balance: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired
  }).isRequired
};

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Wallet);
