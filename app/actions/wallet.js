import * as Ticker from '../helpers/ticker/main';

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

export function changeCurrency(currencies, balance, rate) {
  var balance = Ticker.calculateBalance(currencies, balance, rate);

  return {
    type: CHANGE_CURRENCY,
    balance: balance,
    currency: currencies.to
  }
}


