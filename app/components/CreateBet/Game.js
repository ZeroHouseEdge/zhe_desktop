import React, { Component } from 'react';
import styles from './Game.css';
import { formatStart } from '../../api/mlb/main';

export default class Game extends Component {
  clicked = () => {
    this.props.gameClicked(this.props.game);
  }

  render() {
    const awayLogo = `http://mlb.mlb.com/mlb/images/team_logos/124x150/${this.props.game._attr.away_file_code._value}@2x.png`
    const homeLogo = `http://mlb.mlb.com/mlb/images/team_logos/124x150/${this.props.game._attr.home_file_code._value}@2x.png`
    return (
      <div className={styles.container} onClick={this.clicked}>
        <div className={styles.teams}>
          <div>
            <img src={awayLogo} />
            <h4>{this.props.game._attr.away_team_name._value}</h4>
          </div>
          <div>
            <img src={homeLogo} />
            <h4>{this.props.game._attr.home_team_name._value}</h4>
          </div>
        </div>
        <div className={styles.time}>
          {formatStart(this.props.game._attr.start._value)}
        </div>
      </div>
    );
  }
}
