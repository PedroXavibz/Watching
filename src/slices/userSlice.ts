import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '@/types/user.types';

const initialState: User = {
  roomID: '',
  id: '',
  name: '',
  img: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { roomID, id, name, img } = action.payload;

      state.roomID = roomID;
      state.id = id;
      state.name = name;
      state.img = img;
    },
    setRoomID: (state, action: PayloadAction<string>) => {
      state.roomID = action.payload;
    },
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.img = action.payload;
    }
  }
});

export const { setUser, setName, setID, setImg } = userSlice.actions;

export default userSlice.reducer;
