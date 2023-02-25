import { MouseEventHandler, useEffect, useState } from 'react';
import Player, { PlayerState } from '@/types/player.type';

import styles from './style.module.css';
import { useAppSelector } from '@/hooks/useApp';

type Props = {
  player: Player | null;
  playerStatus: PlayerState | null;
};

const ProgressBar = ({ player, playerStatus }: Props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [progressBarTime, setProgressBarTime] = useState({
    porcent: 0,
    time: 0,
    show: false,
  });

  const [seekBar, setSeekBar] = useState({ isSeek: false });

  const [currentProgressPorcent, setCurrentProgressPorcent] = useState(0);
  const [loadedProgressPorcent, setLoadedProgressPorcent] = useState(0);

  const video = useAppSelector(state => state.video);

  const convertSecondsToPorcent = (seconds: number): number => {
    const curDur = player?.getDuration() || 1;
    return (100 * seconds) / curDur;
  };

  const convertPorcentToSeconds = (porcent: number): number => {
    return (duration * porcent) / 100;
  };

  const formatTime = (time: number): string => {
    const shift = (formatedTime: string[], item: string) => {
      if (item === '0' || item === '00') {
        formatedTime.shift();
      }
    };

    const formatedTime = (
      Math.floor(time / 86400) +
      ':' +
      new Date(time * 1000).toISOString().substr(11, 8)
    ).split(':');

    shift(formatedTime, formatedTime[0]);
    shift(formatedTime, formatedTime[0]);
    return formatedTime.join(':');
  };

  const setStates = (): [number, number] => {
    const curTime = player?.getCurrentTime() || 0;
    const videoDuration = player?.getDuration() || 0;
    const loadedProgress = player?.getVideoLoadedFraction() || 0;

    setCurrentTime(curTime);
    setDuration(videoDuration);

    if (!seekBar.isSeek) {
      const porcent = convertSecondsToPorcent(curTime);
      setCurrentProgressPorcent(porcent);
    }

    setLoadedProgressPorcent(loadedProgress * 100);

    return [curTime, videoDuration];
  };

  useEffect(() => {
    setCurrentTime(0);
    setCurrentProgressPorcent(0);
    setLoadedProgressPorcent(0);
    setStates();
  }, [player, video]);

  const onClick: MouseEventHandler<HTMLDivElement> = e => {
    const { clientWidth } = e.currentTarget;

    const barPosX = e.currentTarget.getBoundingClientRect().x;
    const mouseX = e.clientX - barPosX;
    const porcent = (mouseX / clientWidth) * 100;
    setCurrentProgressPorcent(porcent);

    let time = convertPorcentToSeconds(porcent);

    if (time < 0) time = 0;
    setCurrentTime(time);

    player?.seekTo(time, true);

    const loadedProgress = player?.getVideoLoadedFraction() || 0;
    setLoadedProgressPorcent(loadedProgress * 100);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = e => {
    const { clientWidth } = e.currentTarget;

    const barPosX = e.currentTarget.getBoundingClientRect().x;
    const mouseX = e.clientX - barPosX;
    const porcent = (mouseX / clientWidth) * 100;
    let time = convertPorcentToSeconds(porcent);

    if (time < 0) time = 0;

    if (seekBar.isSeek) {
      setCurrentProgressPorcent(porcent);
      setCurrentTime(time);
      player?.seekTo(time, false);
    }

    setProgressBarTime({ time, porcent, show: true });
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setProgressBarTime({ time: 0, porcent: 0, show: false });
    setSeekBar({ isSeek: false });
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = () => {
    setSeekBar({ isSeek: true });
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = () => {
    setSeekBar({ isSeek: false });
  };

  useEffect(() => {
    let intervalID: any;

    if (playerStatus === 1) {
      intervalID = setInterval(() => {
        const [curTime, videoDuration] = setStates();
        if (curTime >= videoDuration) clearInterval(intervalID);
      }, 1000);
    } else {
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);
  }, [playerStatus, seekBar.isSeek, player, video]);

  return (
    <div
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.progressBarWrapper}
    >
      <div className={styles.progressBar}>
        <div
          style={{ width: `${loadedProgressPorcent}%` }}
          className={styles.loadedProgress}
        />

        <div
          style={{ width: `${currentProgressPorcent}%` }}
          className={styles.currentProgress}
        />
      </div>

      <span className={styles.time}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      {progressBarTime.show && (
        <span
          style={{ left: `${progressBarTime.porcent - 2}%` }}
          className={styles.timeProgressBar}
        >
          {formatTime(progressBarTime.time)}
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
