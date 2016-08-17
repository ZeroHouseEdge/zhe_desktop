import React, { Component } from 'react';
import styles from './Graph.css';

export default class Graph extends Component {
   constructor(props) {
      super(props);
   }

   renderBet = (x, y, i) => {
      const bottom = parseFloat(y) * 245
      console.log(x)
      console.log(`${bottom}px`)
      console.log(i)
      return React.createElement('span', { key: i, className: 'open-bet cubs', style: { left: '6px', bottom: `${bottom}px` } })
   };

   render() {
      var divStyle = {
        bottom: '480px',
        left: '0px'
      };
      var dStyle = {
        bottom: '465.5px',
        left: '0px'
      };
      return (
         <div className={styles.graph_container}>
            <div className={styles.bets_chart}>
               <div className={styles.canvas}>
                  {
                     this.props.bets.map((bet, i) => {
                        return this.renderBet(bet.spread, bet.value, i)
                     })
                  }
               </div>
            </div>
         </div>
      );
   }
}
