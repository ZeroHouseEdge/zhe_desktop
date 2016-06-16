import { CREATE_MNEMONIC, MNEMONIC_CREATED, REGISTER_WALLET, WALLET_REGISTERED } from '../actions/wallet';

const initialState = {
   isLoading: false,
   isAuthenticated: false,
   mnemonic: ''
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case CREATE_MNEMONIC:
      return Object.assign({}, state, {
         isLoading: true,
         isAuthenticated: false,
         mnemonic: null
      })

    case MNEMONIC_CREATED:
      return Object.assign({}, state, {
        isLoading: false,
        isAuthenticated: false,
        mnemonic: action.mnemonic
      })

    case REGISTER_WALLET:
      return Object.assign({}, state, {
        isLoading: true,
        isAuthenticated: false,
        mnemonic: state.mnemonic
      })

    case WALLET_REGISTERED:
      return Object.assign({}, state, {
        isLoading: false,
        isAuthenticated: true,
        mnemonic: state.mnemonic
      })
    default:
      return state;
  }
}
