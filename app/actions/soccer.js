import fetch from 'isomorphic-fetch';
import * as Soccer from '../api/soccer/main';

export const ADD_GAMES = 'ADD_GAMES';

export function addGames(games) {
  return {
    type: ADD_GAMES,
    games,
  };
}

export function fetchGames() {
   return (dispatch) => {
      Soccer.todaysGames().then((games) => {
         dispatch(addGames(games.fixtures));
      });
   };
}
