import React, { Component } from 'react';
import { Link } from 'react-router';
import Logo from './Logo';
import styles from './Home.css';

export default class Home extends Component {
   render() {
      return (
         <div>
            <div className={styles.container}>
               <Link to="/wallet">Wallet</Link>
            </div>
         </div>
      );
   }
}
