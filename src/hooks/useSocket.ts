import { useState, useRef, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

import User from '@/types/user.types';
import Room from '@/types/room.types';
import action from '@/types/action.type';

type Props = {
  enable: boolean;
  onConnected?: () => void;
}

const useSocket = ({ enable, onConnected }: Props) => {
  const ref = useRef<Socket>();

  const [room, setRoom] = useState<Room | null>(null);

  const createRoom = (user: User) => {
    ref.current?.emit(action.CREATE_ROOM, user);
  };

  useEffect(() => {
    if (!enable) {
      return;
    }

    const socket = io('http://localhost:8080', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socket.on(action.CONNECT, () => {
      if (onConnected) {
        onConnected();
      }
    });

    socket.on(action.GET_ROOM, (room: Room) => {
      console.info(`Room connection ${room.id}`);
      setRoom(room);
    });

    socket.on(action.RECONNECT_ATTEMPT, attempt => {
      console.info('Reconnection Attempt: ' + attempt);
    });

    socket.io.on('reconnect_error', error => {
      console.info('Reconnection error: ' + error);
    });

    socket.io.on('reconnect_failed', () => {
      console.info('Reconnection failure.');
      alert('We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.');
    });


    socket.on(action.DISCONNECT, () => {
      console.info('A user disconnected');
    });

    ref.current = socket;

    return () => {
      socket.off(action.CONNECT);
      socket.off(action.DISCONNECT);
      socket.off(action.GET_ROOM);
      socket.disconnect();
    };

  }, [enable, onConnected]);

  return { room, createRoom };
};

export default useSocket;
