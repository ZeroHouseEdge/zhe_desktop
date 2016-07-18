import os from 'os';
import fs from 'fs';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSocket, addSocket } from '../actions/socket';
import io from 'socket.io-client';
import * as API from '../helpers/two1wallet/main';
import { calculatePayout } from '../helpers/betting/main';
import { addWager, updatedWager } from '../actions/wager';
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
      this.props.dispatch(addWager(data.wager));
    })

    this.state.socket.on('bet accepted', (data) => {
      this.props.dispatch(updatedWager(data.wagers));
    })

    this.state.socket.on('notify author', (data) => {
      console.log('notify author data: ', data)
      const notif = new window.Notification('Wager accepted', {
        body: 'Your wager has been accepted'
      })
      // notif.onclick = function () {
      //   ipcRenderer.send('focusWindow', 'main')
      // }
    })

    this.state.socket.on('pay to script', (data) => {
      console.log('time to pay the money to the wager: ', data);
      const wager = data.wager;
      if(wager.author_id === this.props.wallet.pubkey) {
        var arg = `send:${wager.script_address}:${wager.value}`;
      } else {
        const amount = calculatePayout(wager.value, wager.spread);
        var arg = `send:${wager.script_address}:${amount}`;
      }

      API.fetchTwo1([arg]).then((results) => {
        console.log('results: ', results);
      });
    });
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
    socket: store.socket,
    wallet: store.wallet
  };
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default connect(mapStateToProps)(App);
