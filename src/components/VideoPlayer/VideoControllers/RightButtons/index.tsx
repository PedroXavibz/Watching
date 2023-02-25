import { useEffect, useState } from 'react';

import { FiSettings as SettingsIcon } from 'react-icons/fi';
import {
  BiFullscreen as FullScreenIcon,
  BiExitFullscreen as ExitFullScreenIcon,
} from 'react-icons/bi';

import Button from '@/components/Button';
import PlaybackRate from './PlayBackRate';

import Player from '@/types/player.type';

import styles from './style.module.css';
// import Quality from './Quality';

type Props = {
  player: Player | null;
};

const RightButtons = ({ player }: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    const DivPlayer: any =
      player?.getIframe()?.parentNode?.parentNode?.parentNode?.parentNode
        ?.parentNode;

    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      DivPlayer.requestFullscreen();
    }
  };

  useEffect(() => {
    const exitHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', exitHandler);

    return () => document.removeEventListener('fullscreenchange', exitHandler);
  }, []);

  return (
    <div className={styles.rigth}>
      <div className={styles.settings}>
        {showSettings && (
          <ul className={styles.settings_list}>
            <PlaybackRate styles={styles} player={player} />
            {/* <Quality player={player} styles={styles} /> */}
          </ul>
        )}

        <Button
          onClick={() => setShowSettings(!showSettings)}
          className={styles.btn}
          type="button"
          title="Settings"
        >
          <SettingsIcon />
        </Button>
      </div>

      <div>
        <Button
          className={styles.btn}
          type="button"
          title="Full Screen"
          onClick={() => toggleFullScreen()}
        >
          {isFullScreen ? <ExitFullScreenIcon /> : <FullScreenIcon />}
        </Button>
      </div>
    </div>
  );
};

export default RightButtons;
