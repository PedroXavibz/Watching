import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Room from '@/types/room.types';
import User from '@/types/user.types';

const initialState: Room = {
  id: '',
  users: []
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room>) => {
      const { id, users } = action.payload;

      state.id = id;
      state.users = users;
    },
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    }
  }
});

export const { setRoom, setID, setUsers } = roomSlice.actions;

export default roomSlice.reducer;
