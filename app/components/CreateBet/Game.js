import React, { Component } from 'react';
import styles from './Game.css';
import { formatStart, getLogo } from '../../api/mlb/main';

export default class Game extends Component {
  clicked = () => {
    this.props.gameClicked(this.props.game);
  }

  render() {
    return (
      <div className={styles.container} onClick={this.clicked}>
        <div className={styles.teams}>
          <div>
            <img src={getLogo(this.props.game.away_file_code)} />
            <h4>{this.props.game.away_team_name}</h4>
          </div>
          <div>
            <img src={getLogo(this.props.game.home_file_code)} />
            <h4>{this.props.game.home_team_name}</h4>
          </div>
        </div>
        <div className={styles.time}>
          {this.props.game.time}{this.props.game.ampm}
        </div>
      </div>
    );
  }
}
