import { ADD_GAMES } from '../actions/soccer';

const initialState = {
   games: []
};

export default function soccer(state = initialState, action) {
  switch (action.type) {
    case ADD_GAMES:
      return {
        games: action.games
      };

    default:
      return state;
  }
}
