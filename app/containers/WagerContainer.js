import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from './HeaderContainer';

class WagerContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    console.log(this.props.routeParams.wager_id)
  }

  render() {
    const { wager_id } = this.props.routeParams;
    return (
      <div>
        <HeaderContainer />
        hi from wager: {wager_id}
      </div>
    );
  }

  contextTypes: {
    router: React.PropTypes.func.isRequired
  }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet,
    wagers: store.wagers,
    socket: store.socket
  };
}

WagerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WagerContainer);


