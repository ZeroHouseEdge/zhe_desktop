import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchMatchups } from '../actions/casino';
import HeaderContainer from './HeaderContainer';
import CasinoHome from '../components/Casino/CasinoHome';

class CasinoContainer extends Component {
  componentWillMount() {
    this.props.dispatch(fetchMatchups());
  }

  componentDidMount() {
    document.body.classList.toggle('casinoOn')
  }

  componentWillUnmount() {
    document.body.classList.toggle('casinoOn')
  }

  render() {
    return (
      <div>
        <CasinoHome />
      </div>
    );
  }
}

CasinoContainer.contextTypes = {
  router: function () {
    return React.PropTypes.object
  }
};

CasinoContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    wallet: store.wallet,
    casino: store.casino
  };
}

export default connect(mapStateToProps)(CasinoContainer);


