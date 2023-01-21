import { Socket } from 'socket.io-client';
import Room from '@/types/room.types';
import User from '@/types/user.types';

type ServerToClientEvents = {
  getRoom: (room: Room) => void
}

type ClientToServerEvents = {
  createRoom: (user: User) => void
}

type TypeSocket = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
};

export default TypeSocket;
