import os from 'os';
import fs from 'fs';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSocket, addSocket } from '../actions/socket';
import io from 'socket.io-client';
import * as API from '../helpers/two1wallet/main';
import { addWager } from '../actions/wager';
const config = fs.readFileSync(`${os.homedir()}/.two1/wallet/default_wallet.json`);
const socket = io(`http://${process.env.HOST}:5000`);

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { socket: null, user: '' }
  }

  componentWillMount() {

    this.props.dispatch(addSocket(socket))
    this.setState({
      socket: socket,
      user: JSON.parse(config).accounts[0].public_key
    })
  }

  componentDidMount() {
    this.state.socket.on('connect', () => {
      this.state.socket.emit('register user', this.state.user)
    })

    this.state.socket.on('bet created', (data) => {
      console.log('bet created data: ', data)
      this.props.dispatch(addWager(data.wager));
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
