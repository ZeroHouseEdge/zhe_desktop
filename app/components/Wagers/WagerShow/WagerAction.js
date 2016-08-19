import React, { Component } from 'react';
import { serverSignWager } from '../../../api/server/main';
import * as API from '../../../helpers/two1wallet/main';

export default class WagerAction extends Component {
   constructor(props) {
      super(props);
   }

   renderAction = () => {
      if (!this.props.bettor) { return; }

      if (linescore.status !== 'Final') {
         return;
      }

      const linescore = this.props.linescore;
      const wager = this.props.wager;
      const wallet = this.props.wallet;
      const winner = parseInt(linescore.home_team_runs) > parseInt(linescore.away_team_runs) ? wager.home_id : wager.away_id;

      if (wager.winner_transaction) {
         const msg = winner === wallet.pubkey ? 'Click here to collect your money' : 'Click here to send your opponent your money'
         return React.createElement('button',{ onClick: () => { this.sign() } }, msg)
      } else if (wager.transactions.length && !wager.winner_transaction) {
         return React.createElement('button', { onClick: () => { this.serverSign() } }, 'server sign')
      } else {
         return null;
      }
   };

   serverSign = () => {
      serverSignWager(this.props.wager._id)
      .then((res) => {
         console.log('serverSignWager res: ', res)
      })
   };

   sign = () => {
      if (!this.props.bettor) { return; }
      const pubkey = this.props.wallet.pubkey === this.props.wager.home_id ? this.props.wager.home_pubkey : this.props.wager.away_pubkey
      const wager = this.props.wager
      if (this.props.wager.winner_transaction) {
         API.fetchTwo1(['sign', pubkey, wager.winner_transaction.hex, wager.script_hex]).then((res) => {
            console.log('res: ', res)
         })
      }
   };
   render() {
      return (
         <div>
            {this.renderAction()}
         </div>
      )
   }
}
