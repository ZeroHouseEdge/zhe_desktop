import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import styles from './Create.css';
import Wallet from '../Wallet/Wallet';

export default class Create extends Component {
   render() {
      return (
            <div className={styles.container}>
               <div className={styles.backButton} onClick={this.props.back}>
                  <i className="fa fa-arrow-left fa-3x" />
               </div>
               Create
               <Wallet />
            </div>
      );
   }
}
