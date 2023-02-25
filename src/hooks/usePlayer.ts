import { useState, useEffect, MutableRefObject } from 'react';

import { setCurrentVideo } from '@/slices/videoSlice';
import { useAppDispatch } from '@/hooks/useApp';

import { extractHost, extractID } from '@/utils/handleUrl';

import Player, { PlayerState, PlaybackQuality } from '@/types/player.type';
import Video from '@/types/video.type';

const usePlayer = (refPlayer?: MutableRefObject<HTMLDivElement | null>) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerStatus, setPlayerStatus] = useState<PlayerState | null>(null);
  const [windowYT, setWindowTY] = useState<any | null>(null);

  const dispatch = useAppDispatch();

  const setVideoData = (currentPlayer: Player) => {
    const data = currentPlayer.getVideoData();

    if (!data) return;
    const title = data.title || '';
    const channel = data.author || '';

    const url = currentPlayer.getVideoUrl();
    const id = extractID(url) || '';
    const host = extractHost(url);

    const video: Video = {
      id,
      url,
      host,
      load: false,
      info: {
        title,
        channel,
      },
    };

    dispatch(setCurrentVideo(video));
  };

  useEffect(() => {
    setWindowTY(window?.YT);
  }, []);

  useEffect(() => {
    if (!refPlayer) return;

    if (!player) {
      const onPlayerReady = (event: any) => {
        const newPlayer: Player = event.target;
        setPlayer(newPlayer);
        newPlayer.playVideo();
        setVideoData(newPlayer);
      };

      const onPlayerStateChange = (event: any) => {
        const status: PlayerState = event.data;
        setPlayerStatus(status);
      };

      const onPlayerPlaybackQualityChange = (event: any) => {
        const playbackQuality: PlaybackQuality =
          event.target.getPlaybackQuality();
        const suggestedQuality: PlaybackQuality = 'highres';

        console.log('Quality changed to: ' + playbackQuality);

        if (playbackQuality !== 'hd720') {
          console.log('Setting quality to ' + suggestedQuality);
          event.target.setPlaybackQuality(suggestedQuality);
        }
      };

      const onYouTubeIframeAPIReady = () => {
        if (!windowYT) {
          setWindowTY(window.YT);
          return;
        }

        new windowYT.Player(refPlayer.current, {
          width: '100%',
          height: '100%',
          videoId: 'T2oUOWNNnx4',
          playerVars: {
            rel: 0,
            enablejsapi: 1,
            modestbranding: 1,
            controls: 1,
            disablekb: 1,
            autoplay: 0,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onPlaybackQualityChange: onPlayerPlaybackQualityChange,
          },
        });
      };

      if (!windowYT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        onYouTubeIframeAPIReady();
      } else {
        onYouTubeIframeAPIReady();
      }
    }

    return () => {
      player?.destroy();
    };
  }, [refPlayer, player, windowYT]);

  return { player, playerStatus };
};

export default usePlayer;
