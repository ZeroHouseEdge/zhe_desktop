import React, { Component } from 'react';
import { getFlag } from '../../api/soccer/main';
import styles from './Game.css';
import { formatKickoff } from '../../api/soccer/main';

export default class Game extends Component {
  clicked = () => {
    this.props.gameClicked(this.props.game);
  }

  render() {
    return (
      <div className={styles.container} onClick={this.clicked}>
        <div className={styles.teams}>
          <div>
            <img src={getFlag(this.props.game.awayTeamName)} className={styles.flag}></img>
            <h5>{this.props.game.awayTeamName}</h5>
          </div>
          <div>
            <img src={getFlag(this.props.game.homeTeamName)} className={styles.flag}></img>
            <h5>{this.props.game.homeTeamName}</h5>
          </div>
        </div>
        <div className={styles.time}>
          {formatKickoff(this.props.game.date)}
        </div>
      </div>
    );
  }
}
