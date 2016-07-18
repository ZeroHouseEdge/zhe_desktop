import React, { Component } from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import OpenWagersContainer from '../containers/OpenWagersContainer';
import CreateBetContainer from '../containers/CreateBetContainer';
import Logo from './Logo';
import styles from './Home.css';

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         open: false
      };
   }

   openModal = () => {
      this.setState({
         open: true
      });
   };

   closeModal = () => {
      this.setState({
         open: false
      });
   };

   render() {
      return (
         <div>
            <Modal className='modal' isOpen={this.state.open}>
               <div onClick={this.closeModal} className='modalClose'>
                  <FontAwesome name='times' className='closeIcon' />
               </div>
               <CreateBetContainer finished={this.closeModal}  />
            </Modal>
            <div className={styles.container}>
               <div className={styles.main}>
                  <div className={styles.graph}>
                     <OpenWagersContainer />
                  </div>
               </div>
               <div className={styles.buttons}>
                  <div className='buttonContainer'>
                     <div className='buttonPrimary' onClick={this.openModal}>
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
