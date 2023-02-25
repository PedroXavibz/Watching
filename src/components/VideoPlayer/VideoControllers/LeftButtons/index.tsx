import { useState, useEffect } from 'react';

import {
  BsFillPlayFill as PlayIcon,
  BsPauseFill as PauseIcon,
} from 'react-icons/bs';

import { MdReplay as ReplayIcon } from 'react-icons/md';

import { AiFillStepForward as ForwardIcon } from 'react-icons/ai';

import Player, {PlayerState} from '@/types/player.type';

import Button from '@/components/Button';
import Volume from '../../Volume';

import styles from './style.module.css';

type Props = {
  player: Player | null;
  playerStatus: PlayerState | null;
};

const LeftButtons = ({ player, playerStatus }: Props) => {
  const [isPlay, setIsPlay] = useState(false);
  const [replay, setIsReplay] = useState(false);

  const togglePlay = () => {
    const state = player?.getPlayerState();

    switch (state) {
      case -1:
      case 2:
        player?.playVideo();
        setIsPlay(true);
        setIsReplay(false);
        break;

      case 1:
        player?.pauseVideo();
        setIsPlay(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    switch (playerStatus) {
      case 0:
        setIsReplay(true);
        break;

      case 1:
        setIsPlay(true);
        setIsReplay(false);
        break;

      case 2:
        setIsPlay(false);
        break;

      default:
        break;
    }
  }, [playerStatus, player]);

  const handleReplay = () => {
    player?.seekTo(0, true);
    player?.playVideo();
    setIsReplay(false);
  };

  return (
    <div className={styles.left}>
      {replay ? (
        <Button
          className={styles.btn}
          title="Replay"
          onClick={() => handleReplay()}
          type="button"
        >
          <ReplayIcon />
        </Button>
      ) : (
        <Button
          className={styles.btn}
          type="button"
          title={isPlay ? 'Pause' : 'Play'}
          onClick={() => togglePlay()}
        >
          {isPlay ? <PauseIcon /> : <PlayIcon />}
        </Button>
      )}

      <Button className={styles.btn} type="button" title="Forward">
        <ForwardIcon />
      </Button>

      <Volume player={player} />
    </div>
  );
};

export default LeftButtons;
