import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import styles from './Default.css';

export default class Default extends Component {
   render() {
      return (
            <div className={styles.buttonContainer}>
               <div className={styles.buttonAction} onClick={this.props.create}>Create new wallet</div>
               <div onClick={this.props.load}>Load existing wallet</div>
            </div>
      );
   }
}
