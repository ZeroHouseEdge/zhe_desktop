import * as Ticker from '../helpers/ticker/main';
import * as API from '../helpers/two1wallet/main';
import * as ServerAPI from '../api/server/main';

export const REGISTER_WALLET = 'REGISTER_WALLET';
export const WALLET_REGISTERED = 'WALLET_REGISTERED';
export const WALLET_FAILED = 'WALLET_FAILED';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const ADD_PUBKEY = 'ADD_PUBKEY';
export const ADD_WALLET_WAGERS = 'ADD_WALLET_WAGERS';
export const ADD_WALLET_WAGER = 'ADD_WALLET_WAGER';

export function registerWallet() {
  return {
    type: REGISTER_WALLET
  };
}

export function walletRegistered(balance, unconfirmed, address, currency, rate, pubkey, payout_pubkey) {
  return {
    type: WALLET_REGISTERED,
    balance: balance,
    unconfirmed: unconfirmed,
    address: address,
    currency: currency,
    rate: rate,
    pubkey: pubkey,
    payout_pubkey: payout_pubkey
  };
}

export function walletFailed() {
  return {
    type: WALLET_FAILED,
  };
}

export function refreshWallet() {
  return (dispatch) => {
    dispatch(registerWallet());
    return API.fetchTwo1(['balance', 'unconfirmed_balance', 'get_payout_address', 'USD', 'to_dict', 'get_payout_public_key>__bytes__']).then((results) => {
      dispatch(walletRegistered(results[0].balance, results[1].unconfirmed_balance, results[2].get_payout_address, 'satoshis', results[3], results[4].to_dict.accounts[0].public_key, results[5].data));
      dispatch(fetchWagers(results[4].to_dict.accounts[0].public_key))
    });
  }
}

export function changeCurrency(currencies, balance, unconfirmed, rate) {
  var res = Ticker.calculateBalance(currencies, balance, unconfirmed, rate);

  return {
    type: CHANGE_CURRENCY,
    balance: res[0],
    unconfirmed: res[1],
    currency: currencies.to
  }
}

export function addWalletWagers(wagers) {
  return {
    type: ADD_WALLET_WAGERS,
    wagers: wagers
  }
}

export function addWalletWager(wager) {
  return {
    type: ADD_WALLET_WAGER,
    wagers: wager
  }
}

export function fetchWagers(pubkey) {
  return (dispatch) => {
    // dispatch(registerWallet());
    ServerAPI.userWagers(pubkey).then((results) => {
      dispatch(addWalletWagers(results.wagers))
    });
  }
}


