import io from 'socket.io-client';

export const ADD_SOCKET = 'ADD_SOCKET';

export function addSocket() {
   const socket = io(`http://localhost:5000`);
   return {
      type: ADD_SOCKET,
      socket,
   };
}
