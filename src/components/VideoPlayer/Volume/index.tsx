import { useEffect, useState } from 'react';

import {
  ImVolumeMute2 as MutedIcon,
  ImVolumeMute as VolumeOffIcon,
  ImVolumeLow as VolumeLowIcon,
  ImVolumeMedium as VolumeMediumIcon,
  ImVolumeHigh as VolumeHighIcon,
} from 'react-icons/im';

import Button from '@/components/Button';

import styles from './style.module.css';
import Player from '@/types/player.type';

type Props = {
  player: Player | null;
};

const Volume = ({ player }: Props) => {
  const [showVolumeBar, setShowVolumeBar] = useState(false);

  const [volume, setVolume] = useState(70);

  const [isMuted, setIsMuted] = useState(false);

  const onMouseOver = () => {
    if (showVolumeBar) return;
    setShowVolumeBar(true);
  };

  const onMouseLeave = () => {
    if (!showVolumeBar) return;
    setShowVolumeBar(false);
  };

  const toggleMuted = () => {
    if (player?.isMuted()) {
      player?.unMute();
      setIsMuted(false);
    } else {
      player?.mute();
      setIsMuted(true);
    }
  };

  const renderIcon = () => {
    if (isMuted) {
      return <MutedIcon />;
    }

    if (volume === 0) {
      return <VolumeOffIcon />;
    } else if (volume <= 35) {
      return <VolumeLowIcon />;
    } else if (volume > 35 && volume < 65) {
      return <VolumeMediumIcon />;
    } else if (volume >= 65) {
      return <VolumeHighIcon />;
    }
  };

  useEffect(() => {
    player?.setVolume(volume);
  }, [player, volume]);

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className={styles.volume}
    >
      <Button
        className={styles.btn}
        onClick={() => toggleMuted()}
        type="button"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {renderIcon()}
      </Button>

      <div className={styles.helper}/>

      {showVolumeBar && (
        <input
          className={styles.volumeInput}
          title="Volume"
          type="range"
          value={volume}
          onChange={({ target }) => setVolume(+target.value)}
          min={0}
          max={100}
        />
      )}
    </div>
  );
};

export default Volume;
