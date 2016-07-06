import * as Ticker from '../helpers/ticker/main';
import * as API from '../helpers/two1wallet/main';

export const REGISTER_WALLET = 'REGISTER_WALLET';
export const WALLET_REGISTERED = 'WALLET_REGISTERED';
export const WALLET_FAILED = 'WALLET_FAILED';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';

export function registerWallet() {
  return {
    type: REGISTER_WALLET
  };
}

export function walletRegistered(balance, unconfirmed, address, rate) {
  return {
    type: WALLET_REGISTERED,
    balance: balance,
    unconfirmed: unconfirmed,
    address: address,
    rate: rate
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
    return API.fetchTwo1(['balance', 'unconfirmed_balance', 'get_payout_address', 'USD']).then((results) => {
      dispatch(walletRegistered(results[0].balance, results[1].unconfirmed_balance, results[2].get_payout_address, results[3]));
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


