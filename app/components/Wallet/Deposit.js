import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import QRCode from 'qrcode.react';
import styles from './Deposit.css';

class Deposit extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className={styles.container}>
        <qrcode>
          {
            <QRCode value={this.props.wallet.address} size={200} />
          }
        </qrcode>
        <address className={styles.address}>
          {
            this.props.wallet.address
          }
        </address>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Deposit);
