import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import ZHEWallet from 'zhe-wallet';

export default class Wallet extends Component {
   componentDidMount() {
      console.log("yo: ", ZHEWallet);
   }

   render() {
      return (
            <div>
               Here from Wallet
            </div>
      );
   }
}
