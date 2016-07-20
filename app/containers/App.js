import os from 'os';
import fs from 'fs';
import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createSocket, addSocket } from '../actions/socket';
import io from 'socket.io-client';
import * as API from '../helpers/two1wallet/main';
import * as ServerAPI from '../api/server/main';
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
      console.log('arg: ', arg);
      // API.fetchTwo1([arg]).then((results) => {
        // console.log('results: ', results);
        // const tx = results[0].tx;
        // const real = {
        //   user_id: this.props.wallet.pubkey,
        //   tx_id: tx.txid,
        //   hex: tx.hex
        // };
        const fake = {
          user_id: this.props.wallet.pubkey,
          tx_id: 'bc91b066ca26a14ad772e552b3a12e100eadda38303a9dc03f24dec0ce4de783',
          hex: '01000000011e36283b486e1ac14b0d28736dd47601f774325e296f8ed2e9cac07db6fff3b1010000006a4730440220710a384adf81bd54d84e5735bc96a9d37624ff3714047fbcb9025b1fb2e4a81002206aacc83ff8caa3980e3540001c40d9775a3d934f9ef1a599654487babc544bd6012103d55305bb9b480b4d5bda12a069ef63ffae30bb837a01aeeabb56cbfd36e9b1d4ffffffff027eb11700000000001976a9140d8cfbc26dcccdc96a1180fa92d04bc47efc252288ac555f0b000000000017a9141d24abbe3745bbe19792d7848e644d801723cd1d8700000000'
        };
        ServerAPI.addTransaction(wager._id, fake)
        this.props.router.push(`/wager/${wager._id}`)
      // });
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
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

const DecoratedApp = withRouter(App);
export default connect(mapStateToProps)(DecoratedApp);
