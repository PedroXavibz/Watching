import { useEffect, useState } from 'react';

import { IoIosArrowForward as ArrowIcon } from 'react-icons/io';
import { BiTimer as PlaybackSpeedIcon } from 'react-icons/bi';

import Button from '@/components/Button';

import Player, { Playback } from '@/types/player.type';

type Props = {
  player: Player | null;
  styles: any;
};

const PlaybackRate = ({ player, styles }: Props) => {
  const [showPlaybackRate, setShowPlaybackRate] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(player?.getPlaybackRate());

  useEffect(() => {
    setPlaybackRate(player?.getPlaybackRate());
  }, [player]);

  const handlePlaybackRate = (playbackRate: Playback) => {
    player?.setPlaybackRate(playbackRate);
    setPlaybackRate(playbackRate);
  };

  return (
    <li>
      <Button
        onClick={() => setShowPlaybackRate(!showPlaybackRate)}
        type="button"
        title="Playback speed"
      >
        <div className={styles.settings_option_info}>
          <PlaybackSpeedIcon />
          <span>Playback speed</span>
        </div>

        <span className={styles.setting_current}>
          {playbackRate}
          <span style={{ fontSize: '.6rem', marginTop: '.2rem' }}>x</span>
          <ArrowIcon style={{ fontSize: '1.2rem' }} />
        </span>
      </Button>
      <ul
        className={[
          styles.setting_current_list,
          showPlaybackRate ? styles.setting_current_list_active : '',
        ].join(' ')}
      >
        {player?.getAvailablePlaybackRates().map((playbackRate, i) => (
          <li key={i}>
            <Button
              onClick={() => handlePlaybackRate(playbackRate)}
              type="button"
            >
              {playbackRate}
            </Button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default PlaybackRate;
