import { CREATE_MNEMONIC } from '../actions/wallet';

const initialState = {
   isLoading: false,
   isAuthenticated: false
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case CREATE_MNEMONIC:
      return Object.assign({}, state, {
         isLoading: true,
         isAuthenticated: false
      })
    default:
      return state;
  }
}
