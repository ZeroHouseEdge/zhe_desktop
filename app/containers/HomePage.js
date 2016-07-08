import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import HeaderContainer from './HeaderContainer';
import * as API from '../api/server/main';

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    API.openWagers((res) => {
      console.log(res);
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


