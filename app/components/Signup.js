import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import Logo from './Logo';
import styles from './Signup.css';
import Default from './Signup/Default';
import Create from './Signup/Create';
import Load from './Signup/Load';

export default class Signup extends Component {
   constructor(props, context) {
      super(props, context);
      this.createWallet = this.createWallet.bind(this);
      this.loadWallet = this.loadWallet.bind(this);
      this.backToDefault = this.backToDefault.bind(this);

      this.state = { show: false };
   }

   backToDefault() {
      this.setState({ show: false });
   }

   createWallet() {
      this.setState({ show: "create" });
   }

   loadWallet() {
      this.setState({ show: "load" });
   }

   render() {
      return (
         <div className={styles.container}>
            <Logo />
            <div>
               {(() => {
                  switch (this.state.show) {
                     case "create": return <Create back={this.backToDefault} />;
                     case "load": return <Load back={this.backToDefault} />;
                     default: return <Default create={this.createWallet} load={this.loadWallet} />;
                  }
               })()}
            </div>
         </div>
      );
   }
}
