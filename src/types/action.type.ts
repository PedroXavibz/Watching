type Action = {
  CONNECT: string;
  RECONNECT: string;
  RECONNECT_ATTEMPT: string;
  DISCONNECT: string;
  CREATE_ROOM: string;
  JOIN_ROOM: string;
  GET_ROOM: string;
}

const action: Action = {
  CONNECT: 'connect',
  RECONNECT: 'reconnect',
  RECONNECT_ATTEMPT: 'reconnect_attempt',
  DISCONNECT: 'disconnect',
  CREATE_ROOM: 'CREATE_ROOM',
  JOIN_ROOM: 'JOIN_ROOM',
  GET_ROOM: 'GET_ROOM'
};

export default action;
