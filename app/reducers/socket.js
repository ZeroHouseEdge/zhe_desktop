import { ADD_SOCKET } from '../actions/socket';

const initialState = {
   io: null
};

export default function socket(state = initialState, action) {
  switch (action.type) {
    case ADD_SOCKET:
      return {
        io: action.socket
      };

    default:
      return state;
  }
}
