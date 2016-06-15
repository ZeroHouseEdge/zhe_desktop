import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import Logo from './Logo';
import styles from './Signup.css';

export default class Signup extends Component {
   constructor(props, context) {
      super(props, context);
      this.goToCreateWallet = this.goToCreateWallet.bind(this);
      this.goToLoadWallet = this.goToLoadWallet.bind(this);
   }

   goToCreateWallet() {
      alert("create wallet");
   }

   goToLoadWallet() {
      alert("load wallet");
   }

   render() {
      return (
         <div className={styles.container}>
            <Logo />
            <div className={styles.buttonContainer}>
               <div className={styles.buttonAction} onClick={this.goToCreateWallet}>Create new wallet</div>
               <div onClick={this.goToLoadWallet}>Load existing wallet</div>
            </div>
         </div>
      );
   }
}

Signup.contextTypes = {
  router: function () {
    return React.PropTypes.func.isRequired;
  }
};
