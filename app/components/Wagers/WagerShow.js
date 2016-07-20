import React, { Component } from 'react';
import styles from './WagerShow.css';
import * as MLB from '../../api/mlb/main';

export default class WagerShow extends Component {
   constructor(props) {
      super(props);
      this.state = { fetchingData: true, linescore: {} }
   }

   componentWillMount() {
      MLB.getLinescore(this.props.wager.game_data_directory).then((data) => {
         console.log('data: ', data);
         this.setState({
            fetchingData: false,
            linescore: data
         })
      });
   }

   render() {
      const wager = this.props.wager;
      const linescore = this.state.linescore;
      return (
         <div className={styles.container}>
            <section className={styles.matchup}>
               <div className={styles.team}>
                  <img src={MLB.getLogo(wager.away_file_code)} />
                  <span className={styles.record}>({linescore.away_win}-{linescore.away_loss})</span>
               </div>
               <div className={styles.details}>
                  <h2>{linescore.away_team_name} @ {linescore.home_team_name}</h2>
                  <h4>{MLB.fancyDate(linescore.day, linescore.original_date)}</h4>
               </div>
               <div className={styles.team}>
                  <img src={MLB.getLogo(wager.home_file_code)} />
                  <span className={styles.record}>({linescore.home_win}-{linescore.home_loss})</span>
               </div>
            </section>
         </div>
      );
   }
}
