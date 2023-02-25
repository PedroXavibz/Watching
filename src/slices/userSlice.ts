import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '@/types/user.types';

const initialState: User = {
  anonymous: true,
  roomID: '',
  id: '',
  name: '',
  image: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { anonymous, roomID, id, name, image } = action.payload;

      state.anonymous = anonymous;
      state.roomID = roomID;
      state.id = id;
      state.name = name;
      state.image = image;
    },
    setAnonymous: (state, action: PayloadAction<boolean>) => {
      state.anonymous = action.payload;
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
      state.image = action.payload;
    },
  },
});

export const { setUser, setAnonymous, setRoomID, setID, setName, setImg } =
  userSlice.actions;

export default userSlice.reducer;
