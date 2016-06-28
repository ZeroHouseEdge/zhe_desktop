import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import QRCode from 'qrcode.react';
import styles from './Wallet.css';

class Wallet extends Component {
   constructor(props, context) {
      super(props, context);
   }

   render() {
      return (
         <div className={styles.container}>
            <p>
            {
              this.props.wallet.isLoading ? <FontAwesome name='refresh fa-spin' /> : null
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
            <p>
              <QRCode value={this.props.wallet.address} size={200} />
            </p>
         </div>
      );
   }
}

Wallet.propTypes = {

};

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Wallet);
