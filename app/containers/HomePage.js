import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Home from '../components/Home';
import two1wallet from '/Users/jackmallers/.two1/wallet/default_wallet.json';
import HeaderContainer from './HeaderContainer';

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <Home />
      </div>
    );
  }

  contextTypes: {
    router: React.PropTypes.func.isRequired
  }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(HomePage);


