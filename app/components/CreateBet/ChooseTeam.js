import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styles from './ChooseTeam.css';
import { getFlag } from '../../api/soccer/main';
import { calculatePayout } from '../../helpers/betting/main';

class ChooseTeam extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { team: '',  line: 0, value: 0.00 };
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
    this.setState({ line: event.target.value });
  };

  valueChange = (event) => {
    this.setState({ value: event.target.value });
  };

  calcWinnings = () => {
    return calculatePayout(this.state.value, this.state.line);
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
            <div className={styles.team} style={this.isActive(game.awayTeamName)} onClick={() => this.teamClicked(game.awayTeamName)}>
              <h3>{game.awayTeamName}</h3>
              <img src={getFlag(game.awayTeamName)} className={styles.flag}></img>
            </div>
            <div className={styles.team} style={this.isActive(game.homeTeamName)} onClick={() => this.teamClicked(game.homeTeamName)}>
              <h3>{game.homeTeamName}</h3>
              <img src={getFlag(game.homeTeamName)} className={styles.flag}></img>
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
                />
              </span>
            </section>
            <section>
              <h3>Win</h3>
              <span>
                ${this.calcWinnings()}
              </span>
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
