import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import styles from './Create.css';
import WalletContainer from '../../containers/WalletContainer';

export default class Create extends Component {
   render() {
      return (
         <div className={styles.container}>
            <WalletContainer create={true} />
            <a onClick={this.props.back}>Go back</a>
         </div>
      );
   }
}
