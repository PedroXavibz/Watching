import { useEffect, useState } from 'react';

import { GoSettings as QualityIcon } from 'react-icons/go';
import { IoIosArrowForward as ArrowIcon } from 'react-icons/io';

import Player, { PlaybackQuality } from '@/types/player.type';

import Button from '@/components/Button';

type Props = {
  player: Player | null;
  styles: any;
};

const Quality = ({ player, styles }: Props) => {
  const [showQuality, setShowQuality] = useState(false);
  const [currentQuality, setCurrentQuality] = useState(
    player?.getPlaybackQuality()
  );

  const handleSetQuality = (quality:PlaybackQuality) => {
    const time = player?.getCurrentTime() || 1;
    player?.seekTo(time, true);
    player?.setPlaybackQuality(quality);
    setCurrentQuality(quality);
  };

  useEffect(() => {
    setCurrentQuality(player?.getPlaybackQuality());
  }, [player]);

  return (
    <li>
      <Button
        onClick={() => setShowQuality(!showQuality)}
        type="button"
        title="Playback quality"
      >
        <div className={styles.settings_option_info}>
          <QualityIcon />
          <span>Quality</span>
        </div>

        <span className={styles.setting_current}>
          {currentQuality}
          <ArrowIcon style={{ fontSize: '1.2rem' }} />
        </span>
      </Button>

      <ul
        className={[
          styles.setting_current_list,
          showQuality ? styles.setting_current_list_active : '',
        ].join(' ')}
      >
        {player?.getAvailableQualityLevels().map((quality, i) => (
          <li key={i}>
            <Button
              onClick={() => handleSetQuality(quality)}
              type="button"
            >
              {quality}
            </Button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Quality;
