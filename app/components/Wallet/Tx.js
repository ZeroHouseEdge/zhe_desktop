import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import * as Ticker from '../../helpers/ticker/main';
import Sign from '../Sign';
import styles from './Tx.css';

class Tx extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const tx = this.props.tx;
    const txLink = `https://blockexplorer.com/tx/${tx.txid}`
    return (
      <li className={styles.container}>
        <header>
          {Ticker.timeConverter(tx.time)}
        </header>
        <main className={styles.main}>
          <section className={styles.left}>
            <div className={styles.icon}>
              <a href={txLink}  target="_blank">
                <div className={styles.iconWrapper}>
                  {
                    tx.classification === 'deposit' ? <FontAwesome className={styles.customIcon} name='download'><span className={styles.fixEditor}>&nbsp;</span></FontAwesome> : <FontAwesome className={styles.customIcon} name='upload'><span className={styles.fixEditor}>&nbsp;</span></FontAwesome>
                  }
                </div>
              </a>
            </div>
            <message>
            {
              tx.classification === 'deposit' ? 'Received bitcoin' : 'Sent bitcoin'
            }
            </message>
          </section>
          <section className={styles.right}>
            <div>
              <span className={styles.value}>
                <Sign currency='BTC' /> {Ticker.satoshiToBTC(tx.deposits[0].value)}
              </span>
              <span className={styles.value}>
                <Sign currency='satoshis' /> {tx.deposits[0].value}
              </span>
              <span className={styles.value}>
                <Sign currency='USD' /> {Ticker.satoshiToUSD(tx.deposits[0].value, this.props.wallet.rate)}
              </span>
            </div>
          </section>
        </main>
      </li>
    );
  }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Tx);
