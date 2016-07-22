import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './CasinoHome.css';
import Casino from './Casino';
import Matchup from './Matchup';

class CasinoHome extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className={styles.CasinoHome}>
        <header>
          <Casino word='MLB' />
          <Casino word='Casino' />
        </header>
        <section>
          {
            this.props.casino.matchups.map((matchup, i) => {
              return <Matchup key={i} matchup={matchup} />
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
