import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import QRCode from 'qrcode.react';
import styles from './Withdraw.css';
import * as API from '../../helpers/two1wallet/main';
import { usdToBTC, btcToUSD } from '../../helpers/ticker/main';

class Withdraw extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isSending: false, usdAmount: 0.00, btcAmount: 0.00, address: '' };
  }

  usdAmountChange = (e) => {
    const usdAmount = e.target.value;
    const btcAmount = usdToBTC(usdAmount, this.props.wallet.rate);
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

  send = () => {
    if (this.state.isSending || parseFloat(this.state.btcAmount) <= 0 || !this.state.address.length) { return; }
    const arg = `send:${this.state.address}:${this.state.btcAmount}`;
    this.setState({
      isSending: true
    })
    API.fetchTwo1([arg]).then((results) => {
      this.setState({
        isSending: false
      })
      console.log('results: ', results);
      this.props.updateTxs()
    });
  };

  render() {
    var btnClass = this.state.isSending ? 'buttonPrimary inactive' : 'buttonPrimary';
    return (
      <div className={styles.container}>
        <header className={styles.withdrawHeader}>
          <h3>Withdraw</h3>
        </header>

        <section className={styles.withdrawSection}>
          <label htmlFor="address">Wallet Address</label>
          <div className={styles.inputContainer}>
            <span className='fa fa-qrcode'></span>
            <input
              type='text'
              id='address'
              autofocus='true'
              defaultValue={this.state.address}
              onChange={this.addressChange}
            />
          </div>
        </section>
        <section className={styles.withdrawSection}>
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
        <buttonContainer>
          <div className='buttonContainer'>
            <btn className={btnClass} onClick={this.send}>
              {
                this.state.isSending ? 'Sending' : 'Send'
              }
              {
                this.state.isSending ?
                <FontAwesome name='refresh fa-spin' />
                :
                null
              }
            </btn>
          </div>
        </buttonContainer>
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
