import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Sign from '../Sign';
import styles from './ChooseTeam.css';
import { getLogo } from '../../api/mlb/main';
import { calculatePayout } from '../../helpers/betting/main';
import { usdToBTC } from '../../helpers/ticker/main';

class ChooseTeam extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { team: '',  line: 0, value: 0.00, winnings: 0.00 };
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
    this.setState({ line: event.target.value, winnings: winnings });
  };

  valueChange = (event) => {
    const value = event.target.value.length ? event.target.value : 0;
    const winnings = this.calcWinnings(event.target.value, this.state.line);
    this.setState({ value: value, winnings: winnings });
  };

  calcWinnings = (value, line) => {
    return value.length ? calculatePayout(value, line) : 0;
  };

  finished = () => {
    if (!this.state.team.length || this.state.value <=0) { return };
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
              <span>
                <input
                  type="number"
                  defaultValue={this.state.value}
                  onChange={this.valueChange}
                  size='auto'
                />
              </span>
              <div>
                <FontAwesome  name='btc' />0
              </div>
            </section>
            <section>
              <h3>Win</h3>
              <span>
                ${this.state.winnings}
              </span>
              <div>
                <FontAwesome  name='btc' />0
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
