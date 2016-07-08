import { REGISTER_WALLET, WALLET_REGISTERED, WALLET_FAILED, CHANGE_CURRENCY } from '../actions/wallet';

const initialState = {
   isLoading: false,
   balance: null,
   unconfirmed: null,
   address: null,
   currency: 'satoshis',
   rate: null,
   pubkey: null
};


export default function wallet(state = initialState, action) {
  switch (action.type) {
    case REGISTER_WALLET:
      return Object.assign({}, state, {
        isLoading: true,
        balance: state.balance,
        unconfirmed: state.unconfirmed,
        address: state.address,
        currency: state.currency,
        rate: state.rate,
        pubkey: state.pubkey
      })

    case WALLET_REGISTERED:
      return Object.assign({}, state, {
        isLoading: false,
        balance: action.balance,
        unconfirmed: action.unconfirmed,
        address: action.address,
        currency: action.currency,
        rate: action.rate,
        pubkey: action.pubkey
      })

    case WALLET_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        balance: null,
        unconfirmed: null,
        address: '',
        currency: '',
        rate: null,
        pubkey: null
      })

    case CHANGE_CURRENCY:
      return Object.assign({}, state, {
        isLoading: false,
        balance: action.balance,
        unconfirmed: action.unconfirmed,
        address: state.address,
        currency: action.currency,
        rate: state.rate,
        pubkey: state.pubkey
      })

    default:
      return state;
  }
}
