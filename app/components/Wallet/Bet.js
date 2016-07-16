import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Bet.css';

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
      <li>
        <Link to={linkUrl}>
          wager
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
