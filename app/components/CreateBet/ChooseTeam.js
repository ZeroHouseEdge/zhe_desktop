import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Sign from '../Sign';
import styles from './ChooseTeam.css';
import { getLogo } from '../../api/mlb/main';
import { calculatePayout, checkBalance } from '../../helpers/betting/main';
import { usdToBTC } from '../../helpers/ticker/main';

class ChooseTeam extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { team: '',  line: 0, value: 0.00, winnings: 0.00, btcValue: 0.00000000, btcWinnings: 0.00000000 };
  }

  teamClicked = (team) => {
    this.setState({
      team: team
    });
  };

  isActive = (value) => {
    const active = {
      opacity: 1,
      boxShadow: '0px 5px 15px rgba(0,0,0,0.3)'
    }
    return this.state.team === value ? active : null;
  };

  lineChange = (event) => {
    const winnings = this.calcWinnings(this.state.value, event.target.value);
    const btcWinnings = this.btcWinnings(winnings, this.props.wallet.rate);
    this.setState({ line: event.target.value, winnings: winnings, btcWinnings: btcWinnings });
  };

  valueChange = (event) => {
    const value = event.target.value.length ? event.target.value : 0;
    const btcValue = this.btcValue(value, this.props.wallet.rate);
    const winnings = this.calcWinnings(value, this.state.line);
    const btcWinnings = this.btcWinnings(winnings, this.props.wallet.rate);
    this.setState({ value: value, winnings: winnings, btcValue: btcValue, btcWinnings: btcWinnings });
  };

  calcWinnings = (value, line) => {
    return value.length ? calculatePayout(value, line).toFixed(2) : 0;
  };

  btcValue = (value) => {
    return usdToBTC(value, this.props.wallet.rate);
  };

  btcWinnings = (winnings) => {
    return usdToBTC(winnings, this.props.wallet.rate);
  };

  finished = () => {
    if (!this.state.team.length || this.state.value <=0) { return };
    const enough = checkBalance(this.props.wallet.currency, this.props.wallet.unconfirmed, this.state.btcValue, this.props.wallet.rate)
    if (!enough) { alert(`You don't have enough Bitcoin in your account to create this bet`); return; }

    this.props.saveValues(this.state);
    this.props.nextStep();
  };

  render() {
    const game = this.props.game;
    return (
      <div>
        <div>
          <div className={styles.teams}>
            <div className={styles.team} style={this.isActive(game.away_team_name)} onClick={() => this.teamClicked(game.away_team_name)}>
              <h3>{game.away_team_name}</h3>
              <img src={getLogo(game.away_file_code)} className={styles.logo}></img>
            </div>
            <div className={styles.team} style={this.isActive(game.home_team_name)} onClick={() => this.teamClicked(game.home_team_name)}>
              <h3>{game.home_team_name}</h3>
              <img src={getLogo(game.home_file_code)} className={styles.logo}></img>
            </div>
          </div>
          <div className={styles.lineContainer}>
            <h3>Set your line:</h3>
            <input
              type="number"
              defaultValue={this.state.value}
              onChange={this.lineChange}
            />
          </div>
          <div className={styles.valueContainer}>
            <section>
              <h3>Risk</h3>
              <value>
                <input
                  type="number"
                  defaultValue={this.state.value}
                  onChange={this.valueChange}
                  size='auto'
                />
              </value>
              <div className={styles.btc}>
                <FontAwesome name='btc' /> {this.state.btcValue}
              </div>
            </section>
            <section>
              <h3>Win</h3>
              <value>
                {this.state.winnings}
              </value>
              <div className={styles.btc}>
                <FontAwesome  name='btc' /> {this.state.btcWinnings}
              </div>
            </section>
          </div>
        </div>
        <div className={styles.buttons}>
          <div className='buttonContainer circleContainer' onClick={this.props.previousStep}>
            <div className='buttonSecondary circle'>
              <FontAwesome name='arrow-left' />
            </div>
          </div>
          <div className='buttonContainer circleContainer' onClick={this.finished}>
            <div className='buttonPrimary circle'>
              <FontAwesome name='arrow-right' />
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

export default connect(mapStateToProps)(ChooseTeam);
