import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as WagerActions from '../actions/wager';
import { ScatterChart } from 'rd3';
import Graph from '../components/Graph/Graph';

class GraphContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { graphValues: [] }
  }

  componentWillMount() {
    this.props.dispatch(WagerActions.fetchWagers());
  }

  componentDidMount() {

  };

  render() {
    return (
      <div>
        {
          this.props.wagers.isLoading ?
          "Loading..."
          :
          <Graph bets={this.props.wagers.openWagers} />
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

GraphContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GraphContainer);
