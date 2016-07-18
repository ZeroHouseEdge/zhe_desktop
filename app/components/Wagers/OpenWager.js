import React, { Component } from 'react';
import { Link } from 'react-router';
import Sign from '../Sign';
import styles from './OpenWager.css';
import { getLogo } from '../../api/mlb/main';
import { formatLine, formatOppositeLine, calculatePayout } from '../../helpers/betting/main';
import * as Ticker from '../../helpers/ticker/main';

export default class OpenWager extends Component {
   constructor(props) {
      super(props);
   }

   risk = () => {
      const val = calculatePayout(this.formatValue(), this.props.wager.spread);
      switch(this.props.wallet.currency) {
         case 'satoshis':
            return Math.floor(val);
            break;
         case 'BTC':
            return val.toFixed(7);
         case 'USD':
            return val.toFixed(2);
            break;
         default:
            return val.toFixed(7);
      }
   };

   formatValue = () => {
      switch(this.props.wallet.currency) {
         case 'satoshis':
            var val = Ticker.btcToSatoshi(this.props.wager.value, this.props.wallet.rate);
            return val;
            break;
         case 'BTC':
            return this.props.wager.value;
         case 'USD':
            var val = Ticker.btcToUSD(this.props.wager.value, this.props.wallet.rate);
            return val;
            break;
         default:
            return this.props.wager.value;
      }
   };

   render() {
      const wager = this.props.wager;
      return (
         <div className={styles.container}>
            <header>
               <h1><Sign currency={this.props.wallet.currency} />{this.risk()} to win <Sign currency={this.props.wallet.currency} />{this.formatValue()}</h1>
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
