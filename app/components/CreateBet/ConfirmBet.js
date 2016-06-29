import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styles from './ConfirmBet.css';
import { getFlag } from '../../api/soccer/main';
import { calculatePayout, formatLine } from '../../helpers/betting/main';

class ConfirmBet extends Component {
  constructor(props, context) {
    super(props, context);
  }

  oppositeTeam = () => {
    return this.props.data.team === this.props.data.game.awayTeamName ? this.props.data.game.homeTeamName : this.props.data.game.awayTeamName;
  };

  render() {
    return (
      <div className={styles.container}>
        <header>
          <h2>{this.props.data.team}</h2>
          <img src={getFlag(this.props.data.team)} />
        </header>
        <section>
          <span>{this.props.data.team} over {this.oppositeTeam()} at {formatLine(this.props.data.line)} odds</span>
          <span>${this.props.data.value}</span> to win <span>${calculatePayout(this.props.data.value, this.props.data.line)}</span>
        </section>
        <FontAwesome name='arrow-right' onClick={this.props.nextStep} />
        <FontAwesome name='arrow-left' onClick={this.props.previousStep} />
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
