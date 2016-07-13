import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSocket, addSocket } from '../actions/socket';
import io from 'socket.io-client';
import config from '/Users/jackmallers/.two1/wallet/default_wallet.json';
import * as API from '../helpers/two1wallet/main';

const socket = io(`http://localhost:5000`);

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { socket: null }
  }

  componentWillMount() {
    this.props.dispatch(addSocket(socket))
    this.setState({
      socket: socket
    })

  }

  componentDidMount() {
    this.state.socket.on('connect', (x) => {
      this.state.socket.emit('register user', config.accounts[0].public_key)
    })

    this.state.socket.on('bet created', (data) => {
      // 1NmJ6M2sy1bVE6pq2UtwD8RavRSrJt3pRM
      console.log('bet created data: ', data)
      API.fetchTwo1(['send: 1111']).then((res) => {
        console.log('res: ', res);
      });
    })
  }

  render() {
    return (
      <div>
        {this.props.children}
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools'); // eslint-disable-line global-require
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    socket: store.socket
  };
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default connect(mapStateToProps)(App);
