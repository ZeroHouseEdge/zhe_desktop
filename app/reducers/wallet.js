import { REGISTER_WALLET, WALLET_REGISTERED, WALLET_FAILED, CHANGE_CURRENCY } from '../actions/wallet';

const initialState = {
   isLoading: false,
   balance: null,
   address: null,
   currency: 'satoshis',
   rate: null
};


export default function wallet(state = initialState, action) {
  switch (action.type) {
    case REGISTER_WALLET:
      return Object.assign({}, state, {
        isLoading: true,
        balance: state.balance,
        address: state.address,
        currency: state.currency,
        rate: state.rate
      })

    case WALLET_REGISTERED:
      return Object.assign({}, state, {
        isLoading: false,
        balance: action.balance,
        address: action.address,
        currency: state.currency,
        rate: action.rate
      })

    case WALLET_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        balance: null,
        address: '',
        currency: '',
        rate: null
      })

    case CHANGE_CURRENCY:
      return Object.assign({}, state, {
        isLoading: false,
        balance: action.balance,
        address: state.address,
        currency: action.currency,
        rate: state.rate
      })

    default:
      return state;
  }
}
