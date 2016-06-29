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

   render() {
      return (
         <div>
            <ul className={styles.container}>
               <li className={styles.currencies}>
                 <span>
                   <FontAwesome name='usd' />
                 </span>
                 <span>
                   <FontAwesome name='btc' />
                 </span>
                 <span className={styles.active}>
                   シ
                 </span>
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
