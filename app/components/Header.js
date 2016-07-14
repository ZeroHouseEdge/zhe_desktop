import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Logo from './Logo';
import styles from './Header.css';

class Header extends Component {
   constructor(props, context) {
      super(props, context);
   }

   currencyClicked = (currency) => {
      if (this.props.wallet.currency === currency) { return; }
      this.props.changeCurrency(currency);
   };

  isActive = (currency) => {
    const active = {
      color: '#D7A060',
      fontWeight: 'bold',
      fontSize: '1.3em'
    }
    return this.props.wallet.currency === currency ? active : null;
  };

   render() {
      return (
         <div>
            <ul className={styles.container}>
               <li className={styles.currencies}>
                 {
                   this.props.wallet.isLoading ?
                   <FontAwesome name='refresh fa-spin' /> :
                   <currencies>
                     <span style={this.isActive('BTC')} onClick={() => this.currencyClicked('BTC')}>
                       <FontAwesome name='btc' />
                     </span>
                     <span style={this.isActive('satoshis')} onClick={() => this.currencyClicked('satoshis')}>
                       シ
                     </span>
                     <span style={this.isActive('USD')} onClick={() => this.currencyClicked('USD')}>
                       <FontAwesome name='usd' />
                     </span>
                   </currencies>
                 }
               </li>
               <li className={styles.logo}>
                  <Link to="/">
                    <Logo />
                  </Link>
                  {
                    this.props.socket.io.disconnected ?
                    <span className={styles.disconnected} data-hint="Not connected">
                      <FontAwesome name='exclamation-circle' />
                    </span>
                    : null
                  }
               </li>
               <li className={styles.balance}>
                  <Link to="/wallet">
                    <span>
                    {
                      this.props.wallet.isLoading ? <FontAwesome name='refresh fa-spin' /> : this.props.wallet.balance
                    }
                    </span>
                    <span className={styles.currency}>
                    {
                      this.props.wallet.isLoading ? null : this.props.wallet.currency
                    }
                    </span>
                  </Link>
               </li>
            </ul>
         </div>
      );
   }
}

function mapStateToProps(store) {
  return {
    socket: store.socket,
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Header);
