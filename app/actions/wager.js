import * as API from '../api/server/main';

export const ADD_WAGERS = 'ADD_WAGERS';
export const GET_WAGERS = 'GET_WAGERS';

export function addWagers(wagers) {
  return {
    type: ADD_WAGERS,
    wagers,
  };
}

export function getWagers() {
  return {
    type: GET_WAGERS
  };
}

export function fetchWagers() {
   return (dispatch) => {
      dispatch(getWagers());
      API.openWagers().then((res) => {
         dispatch(addWagers(res.wagers));
      });
   };
}
