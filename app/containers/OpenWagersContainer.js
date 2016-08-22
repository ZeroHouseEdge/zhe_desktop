import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import OpenWager from '../components/Wagers/OpenWager';
import * as WagerActions from '../actions/wager';
import * as API from '../api/server/main';
import { checkBalance } from '../helpers/betting/main';

class OpenWagersContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.dispatch(WagerActions.fetchWagers());
  }

  clicked = (wager) => {
    if (this.props.wallet.isLoading) { return; }
    const enough = checkBalance(this.props.wallet.currency, this.props.wallet.unconfirmed, wager.value, this.props.wallet.rate)
    if (!enough) { alert(`You don't have enough Bitcoin in your account to accept this bet`); return; }
    if (this.props.wallet.pubkey === wager.author_id) { alert('You can\'t accept your own bet'); return; }
    const start = new Date(`${wager.original_date} ${wager.time} PM`);
    if (start < new Date()) { alert('Game has already started. You can\'t accept this bet'); return; }

    const user = this.props.wallet.pubkey;
    const pubkey = this.props.wallet.payout_pubkey;
    var data = {
      acceptor_id: user
    };

    if (wager.original_side === 'home') {
      data.away_id = user;
      data.away_pubkey = pubkey
      data.home_pubkey = wager.home_pubkey
    } else {
      data.home_id = user;
      data.home_pubkey = pubkey
      data.away_pubkey = wager.away_pubkey
    }

    this.props.dispatch(WagerActions.updateWagerRequest(wager._id, data))
  };

  render() {
    return (
      <div>
        {
          this.props.wagers.isLoading ?
          "Loading open wagers..." :
          this.props.wagers.openWagers.map((wager, i) => {
            return <OpenWager wallet={this.props.wallet} wager={wager} clicked={this.clicked} key={i} />
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


