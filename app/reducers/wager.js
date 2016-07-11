import { ADD_WAGERS, GET_WAGERS, CREATE_WAGER, ADD_WAGER } from '../actions/wager';

const initialState = {
   isLoading: false,
   openWagers: []
};

export default function wager(state = initialState, action) {
   switch (action.type) {
      case GET_WAGERS:
         return Object.assign({}, state, {
            isLoading: true,
            openWagers: state.wagers
         })
      case ADD_WAGERS:
         return {
            isLoading: false,
            openWagers: action.wagers
         };

      case CREATE_WAGER:
         return Object.assign({}, state, {
            isLoading: true,
            openWagers: state.openWagers
         })

      case ADD_WAGER:
         return {
            isLoading: false,
            openWagers: [action.wager, ...state.openWagers],
         };

      default:
         return state;
   }
}
