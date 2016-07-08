import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './OpenWager.css';
import { getLogo } from '../../api/mlb/main';
import { formatLine, formatOppositeLine, calculatePayout } from '../../helpers/betting/main';

export default class OpenWager extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const wager = this.props.wager;
      return (
         <div className={styles.container}>
            <header>
               <h1>${calculatePayout(wager.value, wager.spread)} to win ${wager.value}</h1>
            </header>
            <article>
               <h2>
                  <span>
                     mlb
                  </span>
                  <span>
                     moneyline
                  </span>
               </h2>
               <section>
                  <team>
                     <img src={getLogo(wager.away_file_code)} />
                     <h4>{wager.away_team_name}</h4>
                  </team>
                  <line>
                     {
                        wager.original_side === 'away' ? formatLine(wager.spread) : formatOppositeLine(wager.spread)
                     }
                  </line>
                  <team>
                     <img src={getLogo(wager.home_file_code)} />
                     <h4>{wager.home_team_name}</h4>
                  </team>
                  <line>
                     {
                        wager.original_side === 'home' ? formatLine(wager.spread) : formatOppositeLine(this.props.wager.spread)
                     }
                  </line>
               </section>
            </article>
            <div className="buttonContainer small" onClick={() => this.props.clicked(wager)}>
               <div className="buttonPrimary">
                  Take the {
                     wager.original_side === 'home' ? wager.away_team_name : wager.home_team_name
                  }
               </div>
            </div>
         </div>
      );
   }
}
