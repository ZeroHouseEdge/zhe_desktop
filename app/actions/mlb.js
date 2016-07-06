import fetch from 'isomorphic-fetch';
import * as MLB from '../api/mlb/main';

export const ADD_GAMES = 'ADD_GAMES';

export function addGames(games) {
  return {
    type: ADD_GAMES,
    games,
  };
}

export function fetchGames() {
   return (dispatch) => {
      MLB.todaysGames().then((games) => {
         dispatch(addGames(games));
      });
   };
}
