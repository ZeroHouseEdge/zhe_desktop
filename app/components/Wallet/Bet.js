import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Bet.css';
import { formatStart, getLogo } from '../../api/mlb/main';

class Bet extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    console.log('wager: ', this.props.wager)
  }

  render() {
    const linkUrl = `/wager/${this.props.wager._id}`;
    return (
      <li className={styles.container}>
        <Link to={linkUrl}>
          <div className={styles.gameDetails}>
            <img src={getLogo(this.props.wager.away_file_code)} />
            <span>vs</span>
            <img src={getLogo(this.props.wager.home_file_code)} />
          </div>
          <div className={styles.betDetails}></div>
        </Link>
      </li>
    );
  }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Bet);
