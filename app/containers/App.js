import os from 'os';
import fs from 'fs';
import React, { Component, PropTypes } from 'react';
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
      ServerAPI.addTransaction(wager._id, {
        user_id: this.props.wallet.pubkey,
        tx_id: "b1f3ffb67dc0cae9d28e6f295e3274f70176d46d73280d4bc11a6e483b28361e",
        hex: "0100000005fa2441d8d46bb32b675f10d4b7c9b26a39b43f679c166bbce23211a66f193648010000006a47304402205b4ed9f4e28a2b839f4e5c93b7d478aa03a8573dbe171aa1660fd57779607bd0022006ce4da6c996a250bcc9d0667efc161f76ae35d4e43ba9e48f2d4ff9724f6125012103845b5fe09462359bc2ec1ec1c4f0836380b46ff332d1b89d99c35603c9266c24ffffffff0294b720d2781048ed59225cc0582f8913ea5fd278fff4444c607f9eae5b84a5000000006b483045022100939e0d27cf3415b7275e8fc8d2803ce4ee01c16650efd12ffbae6200ba5634380220055a1ffe140d02d38f0836c53dc8140bfb849505f7c930486450ce8b2c8b61f3012103845b5fe09462359bc2ec1ec1c4f0836380b46ff332d1b89d99c35603c9266c24ffffffffc55a10c8ee87c33f9817fef0e4f83b3663eff667a59dad85e98d70fb262d6de1000000006a47304402203e64499b44071b2951ae1eefad2a701c56ec129e078649c7a5a091e9b38ec7b502207530e93561ab9dfa9bdb12de09b2b28e702d61aa3d06e4f6edda05ef17e1b11c012103845b5fe09462359bc2ec1ec1c4f0836380b46ff332d1b89d99c35603c9266c24ffffffff0294b720d2781048ed59225cc0582f8913ea5fd278fff4444c607f9eae5b84a5010000006a47304402206cbb5b7e28a8cc9430716b179aa1019cbc5b6233e0875a8422a3c8d5849a6f71022076201fa911623a1a76e08d9ba93fdfa52d1959022e7c6e45c86cb37132bacdc301210244a35eabcdda0edfda3321ea370005760c59a3c51f32d019b9b11a07663b0ad0ffffffffc55a10c8ee87c33f9817fef0e4f83b3663eff667a59dad85e98d70fb262d6de1010000006b483045022100f1295e7ffe5e107671554059a41bea5fa5d8927decfaffead4d785523b252dda02206c3a3be480d6e2dd58aea5098fba95eb77a10a28d978db82605ce001fc8b9d2e0121037754cf62d2b66ff0fbef321a550884310a99388d665eba3c527e1c2f1be38a34ffffffff023d490b000000000017a9141d24abbe3745bbe19792d7848e644d801723cd1d875b3d2300000000001976a91421afe33eb904efecc97a888967e4348fc5248a7f88ac00000000"
      })
      // API.fetchTwo1([arg]).then((results) => {
      //   console.log('results: ', results);
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
};

export default connect(mapStateToProps)(App);
