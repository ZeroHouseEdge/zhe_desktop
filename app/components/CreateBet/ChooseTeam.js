import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Sign from '../Sign';
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
    if (!this.state.value.length) { return 0 };
    return calculatePayout(this.state.value, this.state.line);
  };

  finished = () => {
    console.log(this.state.team);
    if (!this.state.team.length || this.state.value <=0) { return };
    this.props.saveValues(this.state);
    this.props.nextStep();
  };

  render() {
    const game = this.props.game;
    const awayLogo = `http://mlb.mlb.com/mlb/images/team_logos/124x150/${game._attr.away_file_code._value}@2x.png`
    const homeLogo = `http://mlb.mlb.com/mlb/images/team_logos/124x150/${game._attr.home_file_code._value}@2x.png`
    return (
      <div>
        <div>
          <div className={styles.teams}>
            <div className={styles.team} style={this.isActive(game._attr.away_team_name._value)} onClick={() => this.teamClicked(game._attr.away_team_name._value)}>
              <h3>{game._attr.away_team_name._value}</h3>
              <img src={awayLogo} className={styles.logo}></img>
            </div>
            <div className={styles.team} style={this.isActive(game._attr.home_team_name._value)} onClick={() => this.teamClicked(game._attr.home_team_name._value)}>
              <h3>{game._attr.home_team_name._value}</h3>
              <img src={homeLogo} className={styles.logo}></img>
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
