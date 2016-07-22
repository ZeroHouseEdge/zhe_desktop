import fetch from 'isomorphic-fetch';
import * as MLB from '../api/mlb/main';

export const FETCHING_MATCHUPS = 'FETCHING_MATCHUPS';
export const ADD_MATCHUPS = 'ADD_MATCHUPS';

export function fetchingMatchups() {
  return {
    type: FETCHING_MATCHUPS,
  };
}

export function addMatchups(matchups) {
  return {
    type: ADD_MATCHUPS,
    matchups: matchups,
  };
}

export function fetchMatchups() {
  return (dispatch) => {
    dispatch(fetchingMatchups())
    MLB.todaysGames().then((games) => {
      dispatch(addMatchups(games));
    });
  };
}
