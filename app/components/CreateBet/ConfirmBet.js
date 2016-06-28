import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

class ConfirmBet extends Component {
   constructor(props, context) {
      super(props, context);
   }

   render() {
      return (
         <div>
            Confirm Bet
            <FontAwesome name='arrow-right' onClick={this.props.nextStep} />
            <FontAwesome name='arrow-left' onClick={this.props.previousStep} />
         </div>
      );
   }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(ConfirmBet);
