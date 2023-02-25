import ProgressBar from '../ProgressBar';
import LeftButtons from './LeftButtons';
import RightButtons from './RightButtons';

import Player, { PlayerState } from '@/types/player.type';

import styles from './style.module.css';

type Props = {
  player: Player | null;
  playerStatus: PlayerState | null;
};

const VideoControllers = ({ player, playerStatus }: Props) => {
  return (
    <div className={styles.videoController}>
      <ProgressBar player={player} playerStatus={playerStatus} />

      <div className={styles.videoControllerButtons}>
        <LeftButtons playerStatus={playerStatus} player={player} />
        <RightButtons player={player} />
      </div>
    </div>
  );
};

export default VideoControllers;
