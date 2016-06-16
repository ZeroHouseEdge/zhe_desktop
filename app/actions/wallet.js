import ZHEWallet from 'zhe-wallet';
import WalletHelper from '../helpers/wallet/main';

export const CREATE_MNEMONIC = 'CREATE_MNEMONIC';
export const MNEMONIC_CREATED = 'MNEMONIC_CREATED';
export const REGISTER_WALLET = 'REGISTER_WALLET';
export const WALLET_REGISTERED = 'WALLET_REGISTERED';

export function create_mnemonic() {
  return {
    type: CREATE_MNEMONIC
  };
}

export function mnemonic_created(mnemonic) {
  return {
    type: MNEMONIC_CREATED,
    mnemonic: mnemonic
  };
}

export function registerWallet() {
  return {
    type: REGISTER_WALLET
  };
}

export function walletRegistered() {
  return {
    type: WALLET_REGISTERED
  };
}

export function createWallet() {
   return (dispatch) => {
      dispatch(create_mnemonic());

      WalletHelper.createWallet(null, 'bitcoin', (err, data) => {
         dispatch(mnemonic_created(data.mnemonic));
         let res = {};
         if (err) {
            res.err = err
            res.data = null;
         }

         res.err = null;
         res.data = data;

         return res;
      });
   }
}

export function saveWallet(mnemonic) {
  return (dispatch) => {
    dispatch(registerWallet());
    console.log("mnemonic: ", mnemonic);
    process.env.zheWalletSeed = mnemonic;
    dispatch(walletRegistered());

    return true;
  }
}
