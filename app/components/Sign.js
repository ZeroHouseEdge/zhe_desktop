import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class Sign extends Component {
   showSign = () => {
      switch(this.props.currency) {
         case 'satoshis':
            return 'シ';
         case 'BTC':
            return <FontAwesome name='btc' />;
         case 'USD':
            return <FontAwesome name='usd' />;
      }
   }
   render() {
      return (
         <span>
            {this.showSign()}
         </span>
      );
   }
}
