import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styles from './ConfirmBet.css';
import { calculatePayout, formatLine } from '../../helpers/betting/main';

class ConfirmBet extends Component {
  constructor(props, context) {
    super(props, context);
  }

  oppositeTeam = () => {
    return this.props.data.team === this.props.data.game._attr.away_team_name._value ? this.props.data.game._attr.home_team_name._value : this.props.data.game._attr.away_team_name._value;
  };

  finished = () => {
    this.props.finished()
  };

  render() {
    const game = this.props.data.game;
    const logo = this.props.data.team === this.props.data.game._attr.away_team_name._value ? `http://mlb.mlb.com/mlb/images/team_logos/124x150/${game._attr.away_file_code._value}@2x.png` : `http://mlb.mlb.com/mlb/images/team_logos/124x150/${game._attr.home_file_code._value}@2x.png`;
    return (
      <div className={styles.container}>
        <header>
          <h2>{this.props.data.team}</h2>
          <img src={logo} />
        </header>
        <section>
          <msg>{this.props.data.team} over {this.oppositeTeam()} at {formatLine(this.props.data.line)} odds</msg>
          <msg>
            <span>${this.props.data.value}</span> to win <span>${calculatePayout(this.props.data.value, this.props.data.line)}</span>
          </msg>
        </section>
        <div className={styles.buttons}>
          <div className='buttonContainer circleContainer' onClick={this.props.previousStep}>
            <div className='buttonSecondary circle'>
              <FontAwesome name='arrow-left' />
            </div>
          </div>
          <div className='buttonContainer circleContainer' onClick={this.finished}>
            <div className='buttonPrimary circle'>
              <FontAwesome name='check' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(ConfirmBet);
