import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Logo from './Logo';
import styles from './Header.css';

class Header extends Component {
   constructor(props, context) {
      super(props, context);
   }

   render() {
      return (
         <div>
            <ul className={styles.container}>
               <li></li>
               <li className={styles.logo}>
                  <Logo />
               </li>
               <li className={styles.balance}>
                  <span>
                  {
                    this.props.wallet.balance || 'Loading balance...'
                  }
                  </span>
                  <span className={styles.currency}>
                  {
                    this.props.wallet.balance ? 'satoshis' : null
                  }
                  </span>
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
