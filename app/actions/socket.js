import io from 'socket.io-client';

export const ADD_SOCKET = 'ADD_SOCKET';

export function addSocket(socket) {
   return {
      type: ADD_SOCKET,
      socket,
   };
}

export function createSocket() {
   return (dispatch) => {
      const socket = io(`http://localhost:5000`);
      dispatch(addSocket(socket));
      return socket;
   }
}
