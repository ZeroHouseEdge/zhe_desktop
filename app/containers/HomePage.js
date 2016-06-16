import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import Home from '../components/Home';

export default class HomePage extends Component {
  componentWillMount() {
    if (!process.env.zheWalletSeed) {
      this.context.router.push('/signup')
    }
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
