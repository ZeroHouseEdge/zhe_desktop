import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import QRCode from 'qrcode.react';
import styles from './Withdraw.css';
import { usdToBTC, btcToUSD } from '../../helpers/ticker/main';

class Withdraw extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { usdAmount: 0.00, btcAmount: 0.00, address: '' };
  }

  usdAmountChange = (e) => {
    const usdAmount = e.target.value;
    const btcAmount = usdToBTC(usdAmount, this.props.wallet.rate);
    console.log('here w btc: ', btcAmount)
    this.setState({
      usdAmount: usdAmount,
      btcAmount: btcAmount
    })
  };

  btcAmountChange = (e) => {
    const btcAmount = e.target.value;
    const usdAmount = btcToUSD(btcAmount, this.props.wallet.rate);
    this.setState({
      usdAmount: usdAmount,
      btcAmount: btcAmount
    })
  };

  addressChange = (e) => {
    this.setState({
      address: e.target.value
    })
  };

  render() {
    return (
      <div className={styles.container}>
        <section>
          <label htmlFor="address">Wallet Address</label>
          <div className={styles.inputContainer}>
            <span className='fa fa-qrcode'></span>
            <input
              type='text'
              id='address'
              defaultValue={this.state.address}
              onChange={this.addressChange}
            />
          </div>
        </section>
        <section>
          <label htmlFor="amount">Amount</label>
          <div className={styles.inputContainer}>
            <span className='fa fa-usd'></span>
            <input
              type='number'
              id='amount'
              placeholder='0'
              value={this.state.usdAmount}
              onChange={this.usdAmountChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <span className='fa fa-btc'></span>
            <input
              type='number'
              id='amount'
              placeholder='0'
              value={this.state.btcAmount}
              onChange={this.btcAmountChange}
            />
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Withdraw);
