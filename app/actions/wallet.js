import ZHEWallet from 'zhe-wallet';
import bitcoin from 'bitcoinjs-lib';
import fetch from 'isomorphic-fetch';
import WalletHelper from '../helpers/wallet/main';
import two1wallet from '/Users/jackmallers/.two1/wallet/default_wallet.json';



export const REGISTER_WALLET = 'REGISTER_WALLET';
export const WALLET_REGISTERED = 'WALLET_REGISTERED';
export const WALLET_FAILED = 'WALLET_FAILED';

export function registerWallet() {
  return {
    type: REGISTER_WALLET
  };
}

export function walletRegistered(balance, address) {
  return {
    type: WALLET_REGISTERED,
    balance: balance,
    address: address
  };
}

export function walletFailed() {
  return {
    type: WALLET_FAILED,
  };
}


