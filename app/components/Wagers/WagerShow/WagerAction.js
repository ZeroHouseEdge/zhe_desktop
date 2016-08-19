import React, { Component } from 'react';
import { serverSignWager } from '../../../api/server/main';
import * as API from '../../../helpers/two1wallet/main';
import { updateWager } from '../../../api/server/main'

export default class WagerAction extends Component {
   constructor(props) {
      super(props);
      console.log(props)
   }

   renderAction = () => {
      const linescore = this.props.linescore;

      if (!this.props.bettor) { return; }

      if (linescore.status !== 'Final') {
         return;
      }

      const wager = this.props.wager;
      const wallet = this.props.wallet;
      const winner = parseInt(linescore.home_team_runs) > parseInt(linescore.away_team_runs) ? wager.home_id : wager.away_id;

      if (wager.winner_transaction) {
         const msg = winner === wallet.pubkey ? 'Collect your money' : 'Send your opponent your money'
         return React.createElement('div',{ className: 'buttonContainer', onClick: () => { this.sign() } },
            React.createElement('div', { className: 'buttonPrimary', style: { paddingTop: '15px', fontSize: '14px' } }, msg)
         )
      } else if (wager.transactions.length && !wager.winner_transaction) {
         return React.createElement('div', { onClick: () => { this.serverSign() } }, 'server sign')
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
      const pubkey = this.props.wallet.pubkey === this.props.wager.home_id ? this.props.wager.home_pubkey : this.props.wager.away_pubkey;
      const wager = this.props.wager;
      if (this.props.wager.winner_transaction) {
         API.fetchTwo1(['sign', pubkey, wager.winner_transaction.hex, wager.script_hex]).then((res) => {
            console.log('res: ', res)
            const data = res[0]
            updateWager(wager._id, data.tx_id, data.hex)
         })
      }
   };
   render() {
      const style = { width: '60%', margin: '25px auto' }
      return (
         <div style={style}>
            {this.renderAction()}
         </div>
      )
   }
}
