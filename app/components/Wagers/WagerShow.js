import React, { Component } from 'react';
import styles from './WagerShow.css';
import * as MLB from '../../api/mlb/main';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';
import * as API from '../../helpers/two1wallet/main';
import { serverSignWager } from '../../api/server/main';

export default class WagerShow extends Component {
   constructor(props) {
      super(props);
      console.log('props: ', props)
      const author = props.wager.author_id === props.wallet.pubkey
      const acceptor = props.wager.acceptor_id === props.wallet.pubkey
      const bettor = author || acceptor
      this.state = {
         fetchingData: true,
         linescore: {},
         author: author,
         acceptor: acceptor,
         bettor: bettor
      }
   }

   componentWillMount() {
      MLB.getLinescore(this.props.wager.game_data_directory).then((data) => {
         console.log('linescore: ', data)
         this.setState({
            fetchingData: false,
            linescore: data
         })
      });
   }

   renderAction = () => {
      if (!this.state.bettor) { return; }
      if (this.state.linescore.status !== 'Final') { console.log('Game is not over'); return; }
      const wager = this.props.wager
      if (wager.winner_transaction) {
         console.log('user needs to sign')
         return React.createElement('button',{ onClick: () => { this.sign() } }, 'user sign')
      } else if (wager.transactions.length && !wager.winner_transaction) {
         console.log('server needs to sign')
         return React.createElement('button', { onClick: () => { this.serverSign() } }, 'server sign')
      } else {
         console.log('idk')
      }
   };

   serverSign = () => {
      console.log('here at server sign')
      serverSignWager(this.props.wager._id)
      .then((res) => {
         console.log('serverSignWager res: ', res)
      })
   };

   sign = () => {
      if (!this.state.bettor) { return }
      const pubkey = this.props.wallet.pubkey === this.props.wager.home_id ? this.props.wager.home_pubkey : this.props.wager.away_pubkey
      const wager = this.props.wager
      console.log('pubkey: ', pubkey)
      console.log('wager: ', wager)
      if (this.props.wager.winner_transaction) {
         API.fetchTwo1(['sign', pubkey, wager.winner_transaction.hex, wager.script_hex]).then((res) => {
            console.log('res: ', res)
         })
      }
   };

   render() {
      const wager = this.props.wager;
      console.log('wager: ', wager)
      const away_tx = _.find(wager.transactions, (tx) => { return tx.user_id !== wager.home_id })
      console.log('away_tx: ', away_tx)
      const home_tx = _.find(wager.transactions, (tx) => { return tx.user_id === wager.home_id })
      console.log('home_tx: ', home_tx)
      const linescore = this.state.linescore;
      const away_txid = away_tx ? `https://blockchain.info/tx/${away_tx.tx_id}` : '';
      const home_txid = home_tx ? `https://blockchain.info/tx/${home_tx.tx_id}`: '';
      const contractURL = `https://blockchain.info/address/${wager.script_address}`;
      const innings = this.state.linescore.linescore ? this.state.linescore.linescore : Array.apply(null, {length: 9}).map(Number.call, Number)
      const inningsLen = this.state.linescore.linescore && this.state.linescore.linescore.length >= 9 ? this.state.linescore.linescore.length : 9
      return (
         <div className={styles.container}>
            <section className={styles.matchup}>
               <div className={styles.team}>
                  <img src={MLB.getLogo(wager.away_file_code)} />
                  <span className={styles.record}>({linescore.away_win}-{linescore.away_loss})</span>
                  <span className={styles.user_tx}>
                     {
                     away_tx ?
                     <a href={away_txid} target='_blank' data-hint='User paid to the script'>
                        <FontAwesome name='check-circle' />
                     </a>
                     :
                     "Paying to the contract..."
                     }
                  </span>
               </div>
               <div className={styles.details}>
                  <h2>{linescore.away_team_name} @ {linescore.home_team_name}</h2>
                  <h4>{MLB.fancyDate(linescore.day, linescore.original_date)}</h4>
                  <h3>{linescore.time} ET • {linescore.venue}</h3>
                  <div className={styles.contract}>
                     <a href={contractURL} target='_blank'>Contract</a>
                  </div>
               </div>
               <div className={styles.team}>
                  <img src={MLB.getLogo(wager.home_file_code)} />
                  <span className={styles.record}>({linescore.home_win}-{linescore.home_loss})</span>
                  <span className={styles.user_tx}>
                     {
                     home_tx ?
                     <a href={home_txid} target='_blank' data-hint='User paid to the script'>
                        <FontAwesome name='check-circle' />
                     </a>
                     :
                     "Paying to the contract..."
                     }
                  </span>
               </div>
               <div className={styles.linescoreContainer}>
                  <table>
                     <thead>
                        <tr>
                           <th>{this.state.linescore.status}</th>
                           {
                              Array.apply(null, {length: inningsLen}).map(Number.call, Number).map((inn, i) => {
                                 return <th key={i}>{inn + 1}</th>;
                              })
                           }
                           <th className={styles.score}>
                              R
                           </th>
                           <th>
                              H
                           </th>
                           <th>
                              E
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>
                              {this.state.linescore.away_name_abbrev}
                           </td>
                           {
                              innings.map((inn, i) => {
                                 return <td key={i}>{inn.away_inning_runs}</td>
                              })
                           }
                           <td className={styles.score}>
                              {this.state.linescore.away_team_runs}
                           </td>
                           <td>
                              {this.state.linescore.away_team_hits}
                           </td>
                           <td>
                              {this.state.linescore.away_team_errors}
                           </td>
                        </tr>
                        <tr>
                           <td>
                              {this.state.linescore.home_name_abbrev}
                           </td>
                           {
                              innings.map((inn, i) => {
                                 return <td key={i}>{inn.home_inning_runs}</td>
                              })
                           }
                           <td className={styles.score}>
                              {this.state.linescore.home_team_runs}
                           </td>
                           <td>
                              {this.state.linescore.home_team_hits}
                           </td>
                           <td>
                              {this.state.linescore.home_team_errors}
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </section>
            {
               this.renderAction()
            }
         </div>
      );
   }
}
