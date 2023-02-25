import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Video from '@/types/video.type';

const current: Video = {
  id: '',
  url: '',
  host: '',
  load: false,
  info: {
    title: '',
    channel: '',
  },
};

const playlist: Video[] = [];

const initialState = {
  current,
  playlist,
  hasPlaylist: false,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<Video>) => {
      state.current = action.payload;
    },

    setCurrentVideoInfo: (
      state,
      action: PayloadAction<{ title: string; channel: string }>
    ) => {
      state.current.info = action.payload;
    },

    setPlaylist: (state, action: PayloadAction<Video[]>) => {
      state.playlist = action.payload;
      state.hasPlaylist = true;
    },

    appendPlaylist: (state, action: PayloadAction<Video>) => {
      const video = action.payload;
      state.playlist.push(video);

      if (state.playlist.length >= 1) state.hasPlaylist = true;
    },

    removePlaylistVideo: (state, action: PayloadAction<Video>) => {
      if (state.playlist.length === 0) {
        state.hasPlaylist = false;
      } else {
        const videoID = action.payload.id;
        state.playlist = state.playlist.filter(video => video.id !== videoID);
      }
    },
  },
});

export const {
  setCurrentVideo,
  setCurrentVideoInfo,
  setPlaylist,
  appendPlaylist,
  removePlaylistVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
