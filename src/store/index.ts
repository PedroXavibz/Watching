import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/slices/userSlice';
import roomSlice from '@/slices/roomSlice';
import videoSlice from '@/slices/videoSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    room: roomSlice,
    video: videoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
