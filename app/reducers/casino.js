import { FETCHING_MATCHUPS, ADD_MATCHUPS } from '../actions/casino';

const initialState = {
   fetchingMatchups: false,
   matchups: []
};

export default function casino(state = initialState, action) {
   switch (action.type) {
      case FETCHING_MATCHUPS:
         return Object.assign({}, state, {
            fetchingMatchups: true
         })

      case ADD_MATCHUPS:
         return Object.assign({}, state, {
            fetchingMatchups: false,
            matchups: action.matchups
         })

      default:
         return state
   }
}
