import React, { Component } from 'react';
import { Link } from 'react-router';
import Logo from './Logo';
import styles from './Home.css';

export default class Home extends Component {
   render() {
      return (
         <div>
            <div className={styles.container}>
               <div className={styles.main}>
                  <div className={styles.graph}>
                     graph
                  </div>
               </div>
               <div className={styles.buttons}>
                  <div className='buttonContainer'>
                     <div className='buttonPrimary'>
                        Create a bet
                     </div>
                  </div>
                  <div className='buttonContainer'>
                     <div className='buttonSecondary'>
                        Bet with a friend
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
