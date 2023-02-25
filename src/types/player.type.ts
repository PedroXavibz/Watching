type videoData = {
  author: string;
  title: string;
};

export type Playback = 0.25 | 0.5 | 1 | 1.5 | 2;

export type PlayerState = -1 | 0 | 1 | 2 | 3 | 5;

export type PlaybackQuality =
  | 'small'
  | 'medium'
  | 'large'
  | 'hd720'
  | 'hd1080'
  | 'highres';

type Player = {
  getVideoData: () => videoData;
  getVideoUrl: () => string;

  destroy: () => void;
  getIframe: () => HTMLElement;

  getPlaybackQuality: () => PlaybackQuality;
  getAvailableQualityLevels: () => [];
  setPlaybackQuality: (quality: PlaybackQuality) => void;

  getVideoLoadedFraction: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;

  clearVideo: () => void;
  loadVideoById: (id: string, quality: PlaybackQuality) => void;

  getAvailablePlaybackRates: () => Playback[];
  getPlaybackRate: () => Playback;
  setPlaybackRate: (suggestedRate: Playback) => void;

  getVolume: () => number;
  setVolume: (volume: number) => void;
  isMuted: () => boolean;
  mute: () => void;
  unMute: () => void;

  getPlayerState: () => PlayerState;
  playVideo: () => void;
  pauseVideo: () => void;

  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
};

export default Player;
