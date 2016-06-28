import { REGISTER_WALLET, WALLET_REGISTERED, WALLET_FAILED } from '../actions/wallet';

const initialState = {
   isLoading: false,
   balance: null,
   address: null,
   currency: 'satoshis'
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
    case REGISTER_WALLET:
      return Object.assign({}, state, {
        isLoading: true,
        balance: state.balance,
        address: state.address
      })

    case WALLET_REGISTERED:
      return Object.assign({}, state, {
        isLoading: false,
        balance: action.balance,
        address: action.address
      })

    case WALLET_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        balance: null,
        address: ''
      })

    default:
      return state;
  }
}
