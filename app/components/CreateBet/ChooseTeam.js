import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import InputRange from 'react-input-range';
import styles from './ChooseTeam.css';
import { getFlag } from '../../api/soccer/main';

class ChooseTeam extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { team: '',  line: 0, value: 0 };
  }

  teamClicked = (team) => {
    this.setState({
      team: team
    });
  };

  isActive = (value) => {
    const active = {
      // background : '#2E2B44',
      opacity: 1,
      boxShadow: '0px 5px 15px rgba(0,0,0,0.3)'
    }
    return this.state.team === value ? active : null;
  };

  handleLineChange = (component, value) => {
    console.log(value);
    this.setState({
      line: value,
    });
  }

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
            <input type="number" ref={(input) => this.setState({ line: input })}></input>
            <InputRange
              maxValue={1000}
              minValue={-1000}
              value={0}
              onChange={this.handleLineChange.bind(this)}
            />
          </div>
          <div>
            Value
          </div>
        </div>
        <div className='buttonContainer circleContainer' onClick={this.props.previousStep}>
          <div className='buttonSecondary circle'>
            <FontAwesome name='arrow-left' />
          </div>
        </div>
        <div className='buttonContainer circleContainer' onClick={this.props.nextStep}>
          <div className='buttonPrimary circle'>
            <FontAwesome name='arrow-right' />
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
