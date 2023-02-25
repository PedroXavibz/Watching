import { useEffect, useRef } from 'react';
import usePlayer from '@/hooks/usePlayer';

import { useAppSelector } from '@/hooks/useApp';

import VideoControllers from './VideoControllers';

import styles from './style.module.css';

const VideoPlayer = () => {
  const refPlayer = useRef<HTMLDivElement | null>(null);

  const { player, playerStatus } = usePlayer(refPlayer);

  const video = useAppSelector(state => state.video);

  useEffect(() => {
    if (video.current.load) {
      const { id } = video.current;
      id && player?.loadVideoById(id, 'highres');
    }
  }, [video, player]);

  return (
    <div className={styles.videoPlayer}>
      <div className={styles.playerSize}>
        <div className={styles.croppingDiv}>
          <div className={styles.divToCrop}>
            <div className={styles.playerWrapper}>
              <div className={styles.player} ref={refPlayer} />
            </div>
          </div>
        </div>
      </div>

      <VideoControllers playerStatus={playerStatus} player={player} />
    </div>
  );
};

export default VideoPlayer;
