import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Home from '../components/Home';
import rf from '../helpers/readfile/main';
import * as WalletActions from '../actions/wallet';

class HomePage extends Component {
  componentWillMount() {
    rf('wallet.txt', (err, data) => {
      if(!data) {
        this.context.router.push('/signup');
      }
      this.props.dispatch(WalletActions.mnemonic_created(data.toString()));
    });
  }
  render() {
    return (
      <Home />
    );
  }

  contextTypes: {
    router: React.PropTypes.func.isRequired
  }
}

HomePage.contextTypes = {
  router: function () {
    return React.PropTypes.func.isRequired;
  }
};

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    wallet: store.wallet,
    counter: store.counter
  };
}

export default connect(mapStateToProps)(HomePage);


