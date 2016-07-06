import { ADD_GAMES } from '../actions/mlb';

const initialState = {
   games: []
};

export default function mlb(state = initialState, action) {
  switch (action.type) {
    case ADD_GAMES:
      return {
        games: action.games
      };

    default:
      return state;
  }
}
