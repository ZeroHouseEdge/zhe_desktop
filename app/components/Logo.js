import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import styles from './Logo.css';


export default class Logo extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Isvg src="../app/logo.svg"></Isvg>
      </div>
    );
  }
}
