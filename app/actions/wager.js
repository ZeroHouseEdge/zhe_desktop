import * as API from '../api/server/main';

export const ADD_WAGERS = 'ADD_WAGERS';
export const GET_WAGERS = 'GET_WAGERS';
export const CREATE_WAGER = 'CREATE_WAGER';
export const ADD_WAGER = 'ADD_WAGER';

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

export function createWager() {
  return {
    type: CREATE_WAGER
  };
}

export function addWager(wager) {
  return {
    type: ADD_WAGER,
    wager,
  };
}

export function createWagerRequest(data) {
  return (dispatch) => {
    dispatch(createWager());
    API.createWager(data).then((res) => {
      console.log("res: ", res);
      dispatch(addWager(res.wager));
    });
  }
}
