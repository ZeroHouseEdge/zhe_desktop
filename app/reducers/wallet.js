import { REGISTER_WALLET, WALLET_REGISTERED, WALLET_FAILED, CHANGE_CURRENCY, ADD_WALLET_WAGERS, ADD_WALLET_WAGER, UPDATE_WALLET_WAGER, PAY_SCRIPT, SCRIPT_PAYED } from '../actions/wallet';

const initialState = {
   isLoading: false,
   isPayingScript: false,
   balance: null,
   unconfirmed: null,
   address: null,
   currency: 'satoshis',
   rate: null,
   pubkey: null,
   payout_pubkey: null,
   wagers: []
};


export default function wallet(state = initialState, action) {
  switch (action.type) {
    case REGISTER_WALLET:
      return Object.assign({}, state, {
        isLoading: true,
        isPayingScript: false,
        balance: state.balance,
        unconfirmed: state.unconfirmed,
        address: state.address,
        currency: state.currency,
        rate: state.rate,
        pubkey: state.pubkey,
        payout_pubkey: state.payout_pubkey,
        wagers: state.wagers
      })

    case WALLET_REGISTERED:
      return Object.assign({}, state, {
        isLoading: false,
        isPayingScript: false,
        balance: action.balance,
        unconfirmed: action.unconfirmed,
        address: action.address,
        currency: action.currency,
        rate: action.rate,
        pubkey: action.pubkey,
        payout_pubkey: action.payout_pubkey,
        wagers: state.wagers
      })

    case WALLET_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        isPayingScript: false,
        balance: null,
        unconfirmed: null,
        address: '',
        currency: '',
        rate: null,
        pubkey: null,
        payout_pubkey: null,
        wagers: []
      })

    case CHANGE_CURRENCY:
      return Object.assign({}, state, {
        isLoading: false,
        isPayingScript: false,
        balance: action.balance,
        unconfirmed: action.unconfirmed,
        address: state.address,
        currency: action.currency,
        rate: state.rate,
        pubkey: state.pubkey,
        payout_pubkey: state.payout_pubkey,
        wagers: state.wagers
      })

    case ADD_WALLET_WAGERS:
      return Object.assign({}, state, {
        isLoading: false,
        isPayingScript: false,
        balance: state.balance,
        unconfirmed: state.unconfirmed,
        address: state.address,
        currency: state.currency,
        rate: state.rate,
        pubkey: state.pubkey,
        payout_pubkey: state.payout_pubkey,
        wagers: action.wagers
      })

    case ADD_WALLET_WAGER:
      return Object.assign({}, state, {
        isLoading: false,
        isPayingScript: false,
        balance: state.balance,
        unconfirmed: state.unconfirmed,
        address: state.address,
        currency: state.currency,
        rate: state.rate,
        pubkey: state.pubkey,
        payout_pubkey: state.payout_pubkey,
        wagers: [action.wager, ...state.wagers]
      })

    case UPDATE_WALLET_WAGER:
      var wagers = state.wagers.map((w, i) => {
        if(action.wager._id === w._id) {
          return Object.assign({}, action.wager)
        }
        return w
      })

      return Object.assign({}, state, {
        isLoading: false,
        isPayingScript: false,
        balance: state.balance,
        unconfirmed: state.unconfirmed,
        address: state.address,
        currency: state.currency,
        rate: state.rate,
        pubkey: state.pubkey,
        payout_pubkey: state.payout_pubkey,
        wagers: wagers
      })

    case PAY_SCRIPT:
      return Object.assign({}, state, {
        isLoading: false,
        isPayingScript: true,
        balance: state.balance,
        unconfirmed: state.unconfirmed,
        address: state.address,
        currency: state.currency,
        rate: state.rate,
        pubkey: state.pubkey,
        payout_pubkey: state.payout_pubkey,
        wagers: state.wagers
      })

    case SCRIPT_PAYED:
      var wagers = state.wagers.map((w, i) => {
        if (action.wager_id === w._id) {
          return Object.assign({}, w, {
            transactions: action.txs
          })
        }
        return w;
      });
      return Object.assign({}, state, {
        isLoading: false,
        isPayingScript: false,
        balance: state.balance,
        unconfirmed: state.unconfirmed,
        address: state.address,
        currency: state.currency,
        rate: state.rate,
        pubkey: state.pubkey,
        payout_pubkey: state.payout_pubkey,
        wagers: wagers
      })

    default:
      return state;
  }
}
