import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Sign from '../Sign';
import Tx from './Tx';
import Bet from './Bet';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import styles from './Wallet.css';
import * as API from '../../helpers/two1wallet/main';
import * as ServerAPI from '../../api/server/main';

class Wallet extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { tx_history: [], isDepositing: false, isWithdrawing: false, isOpen: false, wagers: [] };
  }

  componentDidMount() {
    API.fetchTwo1(['transaction_history']).then((results) => {
      this.setState({ tx_history: results[0].transaction_history });
    });
    ServerAPI.userWagers(this.props.wallet.pubkey).then((results) => {
      this.setState({ wagers: results.wagers });
    });
  }

  updateTxs = () => {
    this.toggleModal();
  };

  toggleModal = (mode) => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  setMode = (mode) => {
    const data = mode === 'deposit' ? { isDepositing: true, isWithdrawing: false } : { isDepositing: false, isWithdrawing: true };
    this.setState(data);
    this.toggleModal();
  };

  render() {
    return (
      <div className={styles.container}>
        <Modal className='modal' isOpen={this.state.isOpen}>
          <div onClick={this.toggleModal} className='modalClose'>
            <FontAwesome name='times' className='closeIcon' />
          </div>
          {
            this.state.isDepositing ? <Deposit address={this.props.wallet.address} /> : null
          }
          {
            this.state.isWithdrawing ? <Withdraw updateTxs={this.updateTxs} /> : null
          }
        </Modal>

        <div className={styles.buttonContainer}>
          <div className='buttonContainer' onClick={() => this.setMode('deposit')}>
            <btn className='buttonPrimary'>
              Deposit
            </btn>
          </div>
          <div className='buttonContainer circleContainer' onClick={this.props.refresh}>
            <div className='buttonSecondary circle small'>
              {
                this.props.wallet.isLoading ?
                <FontAwesome name='refresh fa-spin' /> :
                <FontAwesome name='refresh' />
              }
            </div>
          </div>
          <div className='buttonContainer' onClick={() => this.setMode('withdraw')}>
            <btn className='buttonPrimary'>
              Withdraw
            </btn>
          </div>
        </div>
        <header className={styles.header}>
          <balance>
            <section className={styles.confirmed}>
              <h3>
                Confirmed Balance
              </h3>
              <span>
                {
                  this.props.wallet.isLoading ?
                  'Loading...' :
                  <span><Sign currency={this.props.wallet.currency} /> {this.props.wallet.balance}</span>
                }
              </span>
            </section>
            <section className={styles.unconfirmed}>
              <h3>
                Unconfirmed Balance
              </h3>
              <span>
                {
                  this.props.wallet.isLoading ?
                  "Loading..." :
                  <span><Sign currency={this.props.wallet.currency} /> {this.props.wallet.unconfirmed}</span>
                }
              </span>
            </section>
          </balance>
        </header>
        <Tabs
          selectedIndex={0}
        >
          <TabList className={styles.tabList}>
            <Tab className={styles.tab}>
              <FontAwesome name='history' className={styles.tabIcon} />
              <h4 className={styles.tabText}>Transaction History</h4>
            </Tab>
            <Tab className={styles.tab}>
              <FontAwesome name='trophy' className={styles.tabIcon} />
              <h4 className={styles.tabText}>Bets</h4>
            </Tab>
          </TabList>

          <TabPanel>
            <ul className={styles.txs}>
              {
                this.state.tx_history.length ?
                this.state.tx_history.map((tx, i) => {
                  return <Tx tx={tx} key={i} />
                })
                :
                "Loading your transaction history..."
              }
            </ul>
          </TabPanel>
          <TabPanel>
            <ul>
              {
                this.state.wagers.length ?
                this.state.wagers.map((wager, i) => {
                  return <Bet wager={wager} key={i} />
                })
                :
                "No wagers brotha"
              }
            </ul>
          </TabPanel>
        </Tabs>
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
