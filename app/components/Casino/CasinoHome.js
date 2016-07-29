import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './CasinoHome.css';
import Casino from './Casino';
import Matchup from './Matchup';

class CasinoHome extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { score: -2 }
  }

  updateScore = (betResult) => {
    switch (betResult) {
      case 'Win':
        this.setState({
          score: this.state.score + 1
        })
        return;
        break;
      case 'Lose':
        this.setState({
          score: this.state.score - 1
        })
        return;
        break;
      default:
        console.log('what?')
        return;
        break;
    }
  };

  render() {
    return (
      <div className={styles.CasinoHome}>
        <header>
          <Casino word='MLB' />
          <Casino word='Casino' />
        </header>
        <h1>{this.state.score}</h1>
        <section>
          {
            this.props.casino.matchups.map((matchup, i) => {
              return <Matchup key={i} matchup={matchup} updateScore={this.updateScore} />
            })
          }
        </section>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet,
    casino: store.casino
  };
}

export default connect(mapStateToProps)(CasinoHome);
