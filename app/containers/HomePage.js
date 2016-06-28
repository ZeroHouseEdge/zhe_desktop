import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Home from '../components/Home';
import two1wallet from '/Users/jackmallers/.two1/wallet/default_wallet.json';
import HeaderContainer from './HeaderContainer';
import * as MLB from '../api/mlb/main';
import * as Soccer from '../api/soccer/main';
import codes from '../api/mlb/country_coodes.json'

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    Soccer.todaysGames().then((games) => {
      const team = games.fixtures[0].awayTeamName;
      const code = Object.keys(codes).filter((key) => { return codes[key] === team })[0];
      // <img src="http://www.geonames.org/flags/x/pt.gif"></img>
    });
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


