import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from './HeaderContainer';
import WagerShow from '../components/Wagers/WagerShow';
import _ from 'lodash';

class WagerContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        {
          this.props.wager && this.props.wallet ?
          <WagerShow wager={this.props.wager} wallet={this.props.wallet} /> :
          "Loading wager..."
        }
      </div>
    );
  }

  contextTypes: {
    router: React.PropTypes.func.isRequired
  }
}

function mapStateToProps(store, props) {
  return {
    wallet: store.wallet,
    wagers: store.wagers,
    socket: store.socket,
    wager: _.find(store.wallet.wagers, { _id: props.routeParams.wager_id })
  };
}

WagerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WagerContainer);


