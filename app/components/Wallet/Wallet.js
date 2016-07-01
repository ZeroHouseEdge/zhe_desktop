import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import QRCode from 'qrcode.react';
import Sign from '../Sign';
import Tx from './Tx';
import styles from './Wallet.css';
import * as API from '../../helpers/two1wallet/main';

class Wallet extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { tx_history: [] };
  }

  componentWillMount() {
    API.fetchTwo1(['transaction_history']).then((results) => {
      this.setState({ tx_history: results[0].transaction_history });
    });
  }

  renderTxs = () => {
    this.state.tx_history.length ? <Tx /> : 'Loading...'
  };

  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <balance>
            <section className={styles.confirmed}>
              <h3>
                Confirmed Balance
              </h3>
              <span>
                {
                  this.props.wallet.balance ?
                  <span><Sign currency={this.props.wallet.currency} /> {this.props.wallet.balance}</span>
                  : "Loading..."
                }
              </span>
            </section>
            <section className={styles.unconfirmed}>
              <h3>
                Unconfirmed Balance
              </h3>
              <span>
                {
                  this.props.wallet.balance ?
                  <span><Sign currency={this.props.wallet.currency} /> {this.props.wallet.unconfirmed}</span>
                  : "Loading..."
                }
              </span>
            </section>
          </balance>
          <qrcode>
            {
              this.props.wallet.address ? <QRCode value={this.props.wallet.address} size={200} /> : "Loading..."
            }
          </qrcode>
          <address>
            {
              this.props.wallet.address ? this.props.wallet.address : "Loading..."
            }
          </address>
        </header>
        <ul className={styles.txs}>
          {
            this.state.tx_history.length ?
            this.state.tx_history.map((tx, i) => {
              return <Tx tx={tx} key={i} />
            })
            :
            <FontAwesome name='refresh fa-spin' />
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Wallet);
