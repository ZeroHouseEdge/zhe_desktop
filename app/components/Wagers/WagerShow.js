import React, { Component } from 'react';
import styles from './WagerShow.css';
import * as MLB from '../../api/mlb/main';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

export default class WagerShow extends Component {
   constructor(props) {
      super(props);
      this.state = { fetchingData: true, linescore: {} }
   }

   componentWillMount() {
      MLB.getLinescore(this.props.wager.game_data_directory).then((data) => {
         this.setState({
            fetchingData: false,
            linescore: data
         })
      });
   }

   render() {
      const wager = this.props.wager;
      const away_tx = _.find(wager.transactions, (tx) => { return tx.user_id === wager.away_id })
      const home_tx = _.find(wager.transactions, (tx) => { return tx.user_id === wager.home_id })
      const linescore = this.state.linescore;
      const away_txid = away_tx ? `https://blockchain.info/tx/${away_tx.tx_id}` : '';
      const home_txid = home_tx ? `https://blockchain.info/tx/${home_tx.tx_id}`: '';
      const contractURL = `https://blockchain.info/address/${wager.script_address}`;
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
            </section>
         </div>
      );
   }
}
