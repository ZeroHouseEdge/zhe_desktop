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
               </li>
               <li className={styles.balance}>
                  <Link to="/wallet">
                    <span>
                    {
                      this.props.wallet.balance || <FontAwesome name='refresh fa-spin' />
                    }
                    </span>
                    <span className={styles.currency}>
                    {
                      this.props.wallet.balance ? this.props.wallet.currency : null
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
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Header);
