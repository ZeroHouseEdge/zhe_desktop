import React, { Component } from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
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
            <Modal className={styles.modal} isOpen={this.state.open}>
               <div onClick={this.closeModal} className={styles.modalClose}>
                  <FontAwesome name='times' className={styles.closeIcon} />
               </div>
               <CreateBetContainer />
            </Modal>
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
                     <div className='buttonSecondary' onClick={this.openModal}>
                        Bet with a friend
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
