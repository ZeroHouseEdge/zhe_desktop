import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchGames } from '../actions/mlb';
import Main from '../components/CreateBet/Main';


class CreateBetContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.dispatch(fetchGames());
  }

  render() {
    return (
      <Main />
    );
  }
}

CreateBetContainer.contextTypes = {
  router: function () {
    return React.PropTypes.func.isRequired;
  }
};

CreateBetContainer.propTypes = {
  soccer: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    wallet: store.wallet,
    soccer: store.soccer
  };
}

export default connect(mapStateToProps)(CreateBetContainer);


