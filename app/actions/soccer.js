import fetch from 'isomorphic-fetch';
import * as Soccer from '../api/soccer/main';

export function fetchGames() {
  // return (dispatch) => {
  //   return callApi('posts').then(res => {
  //     dispatch(addPosts(res.posts));
  //   });
  // };
  Soccer.todaysGames().then((games) => {
    return games.fixtures;
  });
}
