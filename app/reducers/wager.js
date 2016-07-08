import { ADD_WAGERS, GET_WAGERS } from '../actions/wager';

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
            openWagers: action.wagers
         };

      default:
         return state;
   }
}
