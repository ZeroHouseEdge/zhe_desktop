import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import OpenWager from '../components/Wagers/OpenWager';
import * as WagerActions from '../actions/wager';
import * as API from '../api/server/main';

class OpenWagersContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.dispatch(WagerActions.fetchWagers());
  }

  clicked = (wager) => {
    console.log("user: ", this.props.wallet.pubkey);
    console.log("wager: ", wager);
  };

  render() {
    return (
      <div>
        {
          this.props.wagers.isLoading ?
          "Loading open wagers..." :
          this.props.wagers.openWagers.map((wager, i) => {
            return <OpenWager wager={wager} clicked={this.clicked} key={i} />
          })
        }
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

OpenWagersContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(OpenWagersContainer);


