import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Mnemonic.css';

class Mnemonic extends Component {
   constructor(props, context) {
      super(props, context);
      this.clicked = this.clicked.bind(this);
      this.register = this.register.bind(this);

      this.state = { clicked: false };
   }

   clicked() {
      this.setState({ clicked: !this.state.clicked });
   }

   register() {
      if (!this.state.clicked) { return; }
      this.props.register(this.props.wallet.mnemonic);
   }

   render() {
      return (
         <div className={styles.container}>
            <h3>Your passphrase</h3>
            <p className={styles.mnemonic}>{this.props.wallet.mnemonic}</p>
            <p className={styles.warning}>We'll store your passphrase on your computer but your passphrase will not be shown again. Without it you can lose access to your wallet.</p>
            <div className={styles.passphraseAccept}>
               <div className={styles.checkContainer} onClick={this.clicked}>
                  {
                     this.state.clicked ? <div className={styles.check}></div> : null
                  }
               </div>
               <p>I have written down or otherwise securely stored my passphrase</p>
            </div>
            <div className={styles.buttonContainer}>
               <div className={this.state.clicked ? styles.isClicked : null} onClick={this.register}>Register</div>
            </div>
         </div>
      );
   }
}

Mnemonic.propTypes = {
  register: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Mnemonic);


